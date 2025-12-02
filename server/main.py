import os

from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_DB_LINK')
mongo = PyMongo(app)
db = mongo.db

cors = CORS(app, origins='*')

@app.route("/Users", methods=['GET'])
def get_users():
    data = list(db.users.find())

    for users in data:
        users["_id"] = str(users["_id"])

    return jsonify(data), 200

@app.route("/Users/<user_name>", methods=['GET'])
def get_user_by_id(user_name):
    user = db.users.find_one({"user_name": user_name})

    if not user:
        return jsonify({"error": "User not found"}), 404

    user["_id"] = str(user["_id"])
    return jsonify(user), 200

@app.route("/Users/<user_name>/<date>", methods=['DELETE'])
def delete_user_details_by_date(user_name, date):
    db.users.update_one({"user_name": user_name},{"$unset": {date: ""}})
    return jsonify({"message": "date delete successfully"}), 200




# get information for a single user
#
# get information on all users for the dashboard



if __name__ == "__main__":
    app.run(debug=True, port=5050)