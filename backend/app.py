from flask_cors import CORS
import requests
import json 

# Initialize Flask app
# Enable CORS for the app

# Route: /api/questions (GET)
    # Build the Open Trivia DB API URL (set number of questions, type=multiple)
    # Make a GET request to the trivia API
    # If the request is successful:
        # Parse the JSON response
        # For each question:
            # Extract question text, options, correct answer
            # Shuffle the options
            # Add the question (without the correct answer) to a list
        # Return the list of questions as JSON to the frontend
    # Else:
        # Return an error response

# Route: /api/submit (POST)
    # Receive user's answers from the frontend (JSON)
    # For each answer:
        # Compare user's answer with the correct answer
        # Count the number of correct answers
    # Return the score as JSON

# Start the Flask app in debug mode
    #compare_user_answers_with_correct_ones()
    #calculate_score()
    #return_score_as_json()

#start_flask_app_in_debug_mode()
