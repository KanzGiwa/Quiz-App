from flask import Flask, jsonify, request
from flask_cors import CORS
import html
import requests
import random

# Initialize Flask app
app = Flask(__name__)
CORS(app)# Enable CORS for the app

# Store correct answers temporarily (in production, use a database)
correct_answers = []

# Route: /api/questions (GET)
@app.route('/api/questions', methods=['GET'])
def get_questions():
    global correct_answers
    
    # Build Open Trivia DB API URL
    api_url = "https://opentdb.com/api.php?amount=10&type=multiple"
    
    try:
        response = requests.get(api_url)
        print("Raw API response:", response.text)
        data = response.json()
        
        if response.status_code == 200 and data['response_code'] == 0:
            questions = []
            correct_answers = []
            
            for item in data['results']:
                # Combine correct and incorrect answers
                options = item['incorrect_answers'] + [item['correct_answer']]
                random.shuffle(options)
                
                question_data = {
                    'question': item['question'],
                    'options': options
                }
                
                questions.append(question_data)
                correct_answers.append(item['correct_answer'])
            
            return jsonify(questions)
        else:
            print("Unexpected API response structure:", data) 
            return jsonify({'error': 'Failed to fetch questions'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route: /api/submit (POST)
@app.route('/api/submit', methods=['POST'])
def submit_answers():
    user_answers = request.json.get('answers', [])
    
    score = 0
    for i, user_answer in enumerate(user_answers):
        if i < len(correct_answers) and user_answer == correct_answers[i]:
            score += 1
    
    return jsonify({
        'score': score,
        'total': len(correct_answers)
    })

# Start the Flask app in debug mode
if __name__ == '__main__':
    app.run(debug=True)

