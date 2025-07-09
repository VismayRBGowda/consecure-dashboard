from flask import Flask, request, jsonify
from flask_cors import  CORS
import joblib
import traceback

app = Flask(__name__)
CORS(app)

model = joblib.load("model/model.pkl")
vectorizer = joblib.load("model/vectorizer.pkl")

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        description = data.get('description')


        if not description:
            return jsonify({'Error' : "Description is required"})
        
        vectorized = vectorizer.transform([description])
        prediction = model.predict(vectorized)[0]

        return jsonify({'predicted_category' : prediction})
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500
    
if __name__ == '__main__':
    app.run(port=5001, debug=True)