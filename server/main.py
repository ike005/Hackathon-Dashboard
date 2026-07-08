import os
import threading
import json
from flask import Flask, jsonify, request
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

@app.route("/api/users", methods=['GET'])
def get_users():
    data = [serialize(u) for u in db.users_new.find()]
    return jsonify(data), 200

@app.route("/api/users/daily_log", methods=['GET'])
def get_daily_log():
    data = [serialize(d) for d in db.daily_log.find()]
    return jsonify(data), 200

@app.route("/api/users/brainstorming_ideas", methods=['GET'])
def get_brainstorming_ideas():
    data = [serialize(b) for b in db.brainstorming.find()]
    return jsonify(data), 200

@app.route("/api/users/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user_profile_info = db.users_new.find_one({"user_id": user_id})
    user_daily_log = list(db.daily_log.find({"user_id": int(user_id)}))
    user_brainstorming_ideas = list(db.brainstorming.find({"user_id": int(user_id)}))

    if not user_profile_info:
        return jsonify({"error": "User not found"}), 404

    for log in user_daily_log:
        log["_id"] = str(log["_id"])

    for idea in user_brainstorming_ideas:
        idea["_id"] = str(idea["_id"])

    return jsonify({
        "profile_info": serialize(user_profile_info),
        "daily_log": user_daily_log,
        "brainstorming_ideas": user_brainstorming_ideas
    }), 200

@app.route("/api/users/<user_id>", methods=['PATCH'])
def update_user_profile_info_by_id(user_id):
    new_data = request.json

    if not new_data:
        return jsonify({"error": "No update data provided"}), 400

    result = db.users_new.update_one({"user_id": user_id}, {"$set": new_data})

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    # Change stream will catch this automatically, but emitting directly
    # here too means React updates even faster (no stream delay)
    updated_user = to_json(db.users_new.find_one({"user_id": user_id}))
    socketio.emit('user_updated', updated_user)

    return jsonify({"message": "User profile info updated successfully"}), 200


if __name__ == "__main__":
    start_change_streams()  # ← start watchers before serving
    socketio.run(app, debug=True, port=8080)