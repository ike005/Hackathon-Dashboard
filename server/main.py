import os
import threading
import json
from functools import wraps
from flask import Flask, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv
from bson import json_util
from pymongo.errors import PyMongoError

load_dotenv()

app = Flask(__name__)
mongo_uri = os.getenv('MONGO_DB_LINK')

if not mongo_uri:
    raise RuntimeError("MONGO_DB_LINK is not configured.")

# Do not leave Socket.IO requests waiting for PyMongo's default 30-second
# server-selection timeout when Atlas cannot be reached from Render.
timeout_separator = '&' if '?' in mongo_uri else '?'
app.config["MONGO_URI"] = (
    f"{mongo_uri}{timeout_separator}serverSelectionTimeoutMS=10000"
    "&connectTimeoutMS=10000"
)
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY', 'your-secret-key')

mongo = PyMongo(app)
db = mongo.db

if db is None:
    raise Exception("MongoDB connection failed. Check your .env file.")

CORS(app, origins='*')
# socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    cors_allowed_credentials=True,
    # Gunicorn 26 no longer ships its eventlet worker. Threading plus
    # simple-websocket supports both Socket.IO polling and WebSocket transport.
    async_mode='threading',
    ping_timeout=60,
    ping_interval=25,
)

# ── Helper ───────────────────────────────────────────────────────────────────

def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def to_json(doc):
    """Converts BSON (MongoDB types) to a JSON-safe dict."""
    return json.loads(json_util.dumps(doc))


def user_id_filter(user_id):
    """Match user IDs stored as either strings or MongoDB numbers."""
    values = [user_id]
    try:
        numeric_user_id = int(user_id)
        if numeric_user_id not in values:
            values.append(numeric_user_id)
    except (TypeError, ValueError):
        pass

    return {"$in": values}


def handle_database_error(handler):
    """Return a clear Socket.IO error when MongoDB cannot be reached."""
    @wraps(handler)
    def wrapped(*args, **kwargs):
        try:
            return handler(*args, **kwargs)
        except PyMongoError as error:
            print(f"[MongoDB] {handler.__name__} failed: {error}", flush=True)
            emit("server_error", {
                "message": "The server cannot reach MongoDB. Check the Render logs and Atlas Network Access settings."
            })
    return wrapped


def build_user_report_data(user_profile_info):
    user_id = user_profile_info["user_id"]
    query = {"user_id": user_id_filter(user_id)}

    user_daily_log = list(db.daily_log.find(query))
    user_brainstorming_ideas = list(db.brainstorming.find(query))

    for log in user_daily_log:
        serialize(log)

    for idea in user_brainstorming_ideas:
        serialize(idea)

    return {
        "profile_info": serialize(user_profile_info),
        "daily_log": user_daily_log,
        "brainstorming_ideas": user_brainstorming_ideas
    }


# ── Change Stream Watchers ───────────────────────────────────────────────────

def watch_collection(collection_name, event_name):
    """
    Generic watcher — monitors a MongoDB collection for any insert/update
    and emits the changed document to all connected React clients.
    """
    collection = db[collection_name]
    pipeline = [
        {'$match': {'operationType': {'$in': ['insert', 'update', 'replace']}}}
    ]

    print(f'[ChangeStream] Watching {collection_name}...')

    # resume_after lets the stream pick up where it left off if it drops
    while True:
        try:
            with collection.watch(pipeline, full_document='updateLookup') as stream:
                for change in stream:
                    doc = change.get('fullDocument')
                    if doc:
                        clean = to_json(doc)
                        print(f'[ChangeStream] {collection_name} changed, emitting {event_name}')
                        socketio.emit(event_name, clean)
        except Exception as e:
            # If the stream drops (network blip, replica set hiccup), restart it
            print(f'[ChangeStream] {collection_name} stream error: {e}. Restarting...')


def start_change_streams():
    """Spin up one background thread per collection you want to watch."""
    collections = [
        ('users_new',     'user_updated'),
        ('daily_log',     'daily_log_updated'),
        ('brainstorming', 'brainstorming_updated'),
    ]
    for collection_name, event_name in collections:
        t = threading.Thread(
            target=watch_collection,
            args=(collection_name, event_name),
            daemon=True  # dies automatically when the Flask process exits
        )
        t.start()


# ── WebSocket lifecycle ──────────────────────────────────────────────────────

@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client disconnected: {request.sid}')


# ── REST endpoints (unchanged, still useful for initial page load) ────────────

@socketio.on("get_all_users")
@handle_database_error
def get_users():
    data = [serialize(u) for u in db.users_new.find()]
    print(f"Sending {len(data)} users")
    emit("users", data)

@socketio.on("get_all_users_daily_log")
@handle_database_error
def get_daily_log():
    data = [serialize(d) for d in db.daily_log.find()]
    emit("daily_log", data)

@socketio.on("get_all_users_info_with_brainstorming_ideas")
@handle_database_error
def get_users_info_and_brainstorming_ideas():
    data = [serialize(b) for b in db.brainstorming.find()]
    emit("brainstorming_ideas", data)

@socketio.on("get_a_unique_user_data")
@handle_database_error
def get_user_by_id(user_id):
    user_profile_info = db.users_new.find_one({"user_id": user_id_filter(user_id)})

    if not user_profile_info:
        emit("error", {"message": "User not found"})
        return

    emit("user_info", build_user_report_data(user_profile_info))

@socketio.on("get_all_users_report_data")
@handle_database_error
def get_all_users_report_data():
    report_data = [build_user_report_data(user) for user in db.users_new.find()]
    print(f"Sending report data for {len(report_data)} users")
    emit("all_users_report_data", report_data)

if __name__ == "__main__":
    socketio.run(app, debug=True, port=8080)
