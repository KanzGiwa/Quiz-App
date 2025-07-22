import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Fetch questions from backend when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => {
      if (Array.isArray(data)) {
        // If your backend sends back a plain array (already extracted)
        setQuestions(data);
        console.log('Received array:', data);
      } else if (data && Array.isArray(data.results)) {
        // If your backend wraps the questions in a "results" key (e.g., Open Trivia DB format)
        setQuestions(data.results);
        console.log('Received results:', data.results);
      } else {
        console.error('Unexpected API structure:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

  // Submit user answers to backend and receive score
  const handleSubmit = (userAnswers) => {
    fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers: userAnswers }),
    })
      .then(response => response.json())
      .then(data => {
        setScore(data.score);
        setSubmitted(true);
        console.log('Submission response:', data);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz App</h1>
        {!submitted ? (
          <Quiz questions={questions} onSubmit={handleSubmit} />
        ) : (
          <Result score={score} total={questions.length} />
        )}
      </header>
    </div>
  );
}

export default App;
