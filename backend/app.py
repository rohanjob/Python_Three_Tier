from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
# Enable CORS for all routes to allow frontend to communicate with backend
CORS(app)

# MongoDB connection string from environment variable
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(mongo_uri)
db = client["devboard"]
collection = db["feedback"]

@app.route("/feedback", methods=["POST"])
def add_feedback():
    try:
        data = request.json
        if not data or 'name' not in data or 'message' not in data:
            return {"error": "Invalid input"}, 400
        
        collection.insert_one(data)
        return {"message": "Feedback Stored"}, 201
    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/feedback", methods=["GET"])
def get_feedback():
    try:
        # Convert MongoDB cursor to list and remove _id field for JSON serialization
        items = list(collection.find({}, {"_id": 0}))
        return jsonify(items)
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
