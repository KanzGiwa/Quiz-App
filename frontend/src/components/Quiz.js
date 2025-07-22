import React, { useState } from 'react';
import Question from './Question';

function Quiz({ questions, onSubmit }) {
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedAnswer
    }));
  };

  const handleSubmit = () => {
    const answersArray = questions.map((_, index) => userAnswers[index] || '');
    onSubmit(answersArray);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        marginBottom: '30px', 
        fontSize: '18px',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '15px',
        borderRadius: '10px',
        backdropFilter: 'blur(5px)'
      }}>
        📊 Progress: {Object.keys(userAnswers).length} / {questions.length} questions answered
      </div>
      
      {Array.isArray(questions) && questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          questionIndex={index}
          onAnswerSelect={handleAnswerSelect}
        />
      ))}
      
      <button 
        onClick={handleSubmit} 
        disabled={Object.keys(userAnswers).length !== questions.length}
        style={{
          padding: '20px 40px',
          fontSize: '20px',
          fontWeight: 'bold',
          background: Object.keys(userAnswers).length === questions.length 
            ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
            : 'rgba(255, 255, 255, 0.3)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: Object.keys(userAnswers).length === questions.length ? 'pointer' : 'not-allowed',
          marginTop: '30px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          opacity: Object.keys(userAnswers).length === questions.length ? 1 : 0.6
        }}
      >
        🎯 Submit Quiz
      </button>
    </div>
  );
}

export default Quiz;
