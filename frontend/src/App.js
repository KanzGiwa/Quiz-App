import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  // Function to decode HTML entities
  const decodeHTML = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  // Fetch questions from backend
  const fetchQuestions = () => {
    setLoading(true);
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
          setQuizStarted(true);
          setLoading(false);
          console.log('Received array:', decodedQuestions);
        } else if (data && Array.isArray(data.results)) {
          // Decode HTML entities in questions and options
          const decodedQuestions = data.results.map(q => ({
            ...q,
            question: decodeHTML(q.question),
            options: q.options.map(option => decodeHTML(option))
          }));
          setQuestions(decodedQuestions);
          setQuizStarted(true);
          setLoading(false);
          console.log('Received results:', decodedQuestions);
        } else {
          console.error('Unexpected API structure:', data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  // Start new quiz
  const handleStartQuiz = () => {
    fetchQuestions();
  };

  // Reset quiz to start screen
  const handleResetQuiz = () => {
    setQuestions([]);
    setScore(0);
    setSubmitted(false);
    setQuizStarted(false);
    setUserAnswers([]);
    setCorrectAnswers([]);
  };

  // Submit user answers to backend and receive score
  const handleSubmit = (answers) => {
    setLoading(true);
    setUserAnswers(answers);
    fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers: answers }),
    })
      .then(response => response.json())
      .then(data => {
        setScore(data.score);
        setCorrectAnswers(data.correctAnswers || []);
        setSubmitted(true);
        setLoading(false);
        console.log('Submission response:', data);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="quiz-title">🧠 Quiz Master</h1>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div style={{ fontSize: '18px' }}>Loading awesome questions...</div>
          </div>
        ) : !quizStarted ? (
          <div className="start-container">
            <p style={{ fontSize: '18px', marginBottom: '30px', lineHeight: '1.6' }}>
              🚀 Welcome to Quiz Master! Test your knowledge with 10 challenging trivia questions 
              from various categories. Are you ready to become a quiz champion?
            </p>
            <button 
              className="start-button"
              onClick={handleStartQuiz}
            >
              🎯 Start Quiz
            </button>
          </div>
        ) : !submitted ? (
          <Quiz questions={questions} onSubmit={handleSubmit} />
        ) : (
          <Result 
            score={score} 
            total={questions.length} 
            onReset={handleResetQuiz}
            questions={questions}
            userAnswers={userAnswers}
            correctAnswers={correctAnswers}
          />
        )}
      </header>
    </div>
  );
}



export default App;
