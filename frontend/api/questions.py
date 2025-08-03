from http.server import BaseHTTPRequestHandler
import json
import html
import requests
import random
import os

# Store correct answers temporarily - in production, use a proper database
correct_answers_store = {}

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Set CORS headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Build Open Trivia DB API URL
        api_url = "https://opentdb.com/api.php?amount=10&type=multiple"
        
        try:
            response = requests.get(api_url)
            data = response.json()
            
            if response.status_code == 200 and data['response_code'] == 0:
                questions = []
                correct_answers = []
                
                for item in data['results']:
                    # Decode HTML entities and combine correct and incorrect answers
                    decoded_correct = html.unescape(item['correct_answer'])
                    decoded_incorrect = [html.unescape(ans) for ans in item['incorrect_answers']]
                    
                    options = decoded_incorrect + [decoded_correct]
                    random.shuffle(options)
                    
                    question_data = {
                        'question': html.unescape(item['question']),
                        'options': options
                    }
                    
                    questions.append(question_data)
                    correct_answers.append(decoded_correct)
                
                # Store correct answers (in production, use proper session management)
                session_id = str(random.randint(1000, 9999))
                correct_answers_store[session_id] = correct_answers
                
                # Return questions with session ID
                response_data = {
                    'questions': questions,
                    'sessionId': session_id
                }
                
                self.wfile.write(json.dumps(response_data).encode())
            else:
                error_response = {'error': 'Failed to fetch questions'}
                self.wfile.write(json.dumps(error_response).encode())
                
        except Exception as e:
            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
