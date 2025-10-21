from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/api/users", methods=['GET'])
def user():
    return jsonify(
        {
            "users": [
                'jack',
                'jessy'
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=5050)