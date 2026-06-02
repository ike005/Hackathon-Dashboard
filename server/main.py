import os

from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_DB_LINK')
mongo = PyMongo(app)
db = mongo.db

if db is None:
    raise Exception("MongoDB connection failed. Check your .env file.")

cors = CORS(app, origins='*')

# Used in getting all users profile information
@app.route("/api/users", methods=['GET'])
def get_users():
    data = list(db.users_new.find())

    for users in data:
        users["_id"] = str(users["_id"])

    return jsonify(data), 200

# Used in getting all users daily log
@app.route("/api/users/daily_log", methods=['GET'])
def get_daily_log():
    data = list(db.daily_log.find())

    for daily_log in data:
        daily_log["_id"] = str(daily_log["_id"])

    return jsonify(data), 200

# Used in getting all users brainstorming ideas
@app.route("/api/users/brainstorming_ideas", methods=['GET'])
def get_brainstorming_ideas():
    data = list(db.brainstorming.find())

    brainstorming_ideas = []
    for brainstorming_ideas in data:
        brainstorming_ideas["_id"] = str(brainstorming_ideas["_id"])

    return jsonify(brainstorming_ideas), 200

# This returns all a particular users information
# @app.route("/api/users/<user_id>", methods=['GET'])
# def get_user_by_id(user_id):
#     user_profile_info = db.users_new.find_one({"user_id": user_id})
#     user_daily_log = db.daily_log.find({"user_id": user_id})
#     user_brainstorming_ideas = db.brainstorming.find({"user_id": user_id})
#
#     if not user_profile_info:
#         return jsonify({"error": "User not found"}), 404
#     if not user_daily_log:
#         return jsonify({"error": "User not found"}), 404
#     if not user_brainstorming_ideas:
#         return jsonify({"error": "User not found"}), 404
#
#     user_profile_info["_id"] = str(user_profile_info["_id"])
#     user_daily_log["_id"] = str(user_daily_log["_id"])
#     user_brainstorming_ideas["_id"] = str(user_brainstorming_ideas["_id"])
#
#     return jsonify({
#         "profile_info": user_profile_info,
#         "daily_log": user_daily_log,
#         "brainstorming_ideas": user_brainstorming_ideas
#     }), 200

@app.route("/api/users/<user_id>", methods=["GET"])
def get_user_by_id(user_id):

    user_profile_info = db.users_new.find_one({"user_id": user_id})

    user_daily_log = list(db.daily_log.find({"user_id": int(user_id)}))

    user_brainstorming_ideas = list(db.brainstorming.find({"user_id": int(user_id)}))

    if not user_profile_info:
        return jsonify({"error": "User not found"}), 404

    user_profile_info["_id"] = str(user_profile_info["_id"])

    for log in user_daily_log:
        log["_id"] = str(log["_id"])

    for idea in user_brainstorming_ideas:
        idea["_id"] = str(idea["_id"])

    return jsonify({
        "profile_info": user_profile_info,
        "daily_log": user_daily_log,
        "brainstorming_ideas": user_brainstorming_ideas
    }), 200

# This is used to update a users profile
@app.route("/api/users/<user_id>", methods=['PATCH'])
def update_user_profile_info_by_id(user_id):
    new_data = request.json

    if not new_data:
        return jsonify({"error": "No update data provided"}), 400

    result = db.users_new.update_one({"user_id": user_id}, {"$set": new_data})

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "User profile info updated successfully"}), 200

# @app.route("/Users/<user_name>/<date>", methods=['DELETE'])
# def delete_user_details_by_date(user_name, date):
#     db.users_new.update_one({"user_name": user_name},{"$unset": {date: ""}})
#     return jsonify({"message": "date delete successfully"}), 200




# get information for a single user
#
# get information on all users for the dashboard



if __name__ == "__main__":
    app.run(debug=True, port=8080)