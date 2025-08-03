from http.server import BaseHTTPRequestHandler
import json

# Import the correct answers store from questions
from .questions import correct_answers_store

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Set CORS headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        try:
            # Get request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_answers = data.get('answers', [])
            session_id = data.get('sessionId', '')
            
            # Get correct answers for this session
            correct_answers = correct_answers_store.get(session_id, [])
            
            # Calculate score
            score = 0
            for i, user_answer in enumerate(user_answers):
                if i < len(correct_answers) and user_answer == correct_answers[i]:
                    score += 1
            
            response_data = {
                'score': score,
                'total': len(correct_answers),
                'correctAnswers': correct_answers
            }
            
            self.wfile.write(json.dumps(response_data).encode())
            
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
