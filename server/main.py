import os

from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_DB_LINK')
mongo = PyMongo(app)
db = mongo.db

cors = CORS(app, origins='*')

@app.route("/api/db", methods=['GET'])
def user():
    data = list(db.users.find())

    for u in data:
        u["_id"] = str(u["_id"])

    return jsonify(data), 200

if __name__ == "__main__":
    app.run(debug=True, port=8080)