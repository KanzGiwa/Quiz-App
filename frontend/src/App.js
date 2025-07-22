import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Function to decode HTML entities
  const decodeHTML = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  // Fetch questions from backend when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Decode HTML entities in questions and options
          const decodedQuestions = data.map(q => ({
            ...q,
            question: decodeHTML(q.question),
            options: q.options.map(option => decodeHTML(option))
          }));
          setQuestions(decodedQuestions);
          console.log('Received array:', decodedQuestions);
        } else if (data && Array.isArray(data.results)) {
          // Decode HTML entities in questions and options
          const decodedQuestions = data.results.map(q => ({
            ...q,
            question: decodeHTML(q.question),
            options: q.options.map(option => decodeHTML(option))
          }));
          setQuestions(decodedQuestions);
          console.log('Received results:', decodedQuestions);
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
