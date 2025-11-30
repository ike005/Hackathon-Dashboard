import os

import dotenv
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
    userName= db.users.find_one()

if __name__ == "__main__":
    app.run(debug=True, port=5050)