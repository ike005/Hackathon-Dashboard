import os
import threading
import json
from flask import Flask, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv
from bson import json_util

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_DB_LINK')
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY', 'your-secret-key')

mongo = PyMongo(app)
db = mongo.db

if db is None:
    raise Exception("MongoDB connection failed. Check your .env file.")

CORS(app, origins='*')
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')


# ── Helper ───────────────────────────────────────────────────────────────────

def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def to_json(doc):
    """Converts BSON (MongoDB types) to a JSON-safe dict."""
    return json.loads(json_util.dumps(doc))


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
def get_users():
    data = [serialize(u) for u in db.users_new.find()]
    print(f"Sending {len(data)} users")
    emit("users", data)

@socketio.on("get_all_users_daily_log")
def get_daily_log():
    data = [serialize(d) for d in db.daily_log.find()]
    emit("daily_log", data)

@socketio.on("get_all_users_info_with_brainstorming_ideas")
def get_users_info_and_brainstorming_ideas():
    data = [serialize(b) for b in db.brainstorming.find()]
    emit("brainstorming_ideas", data)

@socketio.on("get_a_unique_user_data")
def get_user_by_id(user_id):
    user_profile_info = db.users_new.find_one({"user_id": user_id})
    user_daily_log = list(db.daily_log.find({"user_id": int(user_id)}))
    user_brainstorming_ideas = list(db.brainstorming.find({"user_id": int(user_id)}))

    if not user_profile_info:
        emit({"error": "User not found"})
        return

    for log in user_daily_log:
        log["_id"] = str(log["_id"])

    for idea in user_brainstorming_ideas:
        idea["_id"] = str(idea["_id"])

    emit("user_info", {
        "profile_info": serialize(user_profile_info),
        "daily_log": user_daily_log,
        "brainstorming_ideas": user_brainstorming_ideas
    })

if __name__ == "__main__":
    start_change_streams()  # ← start watchers before serving
    socketio.run(app, debug=True, port=8080)