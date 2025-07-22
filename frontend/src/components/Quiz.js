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
    <div>
      {Array.isArray(questions) && questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          questionIndex={index}
          onAnswerSelect={handleAnswerSelect}
        />
      ))}
      <button onClick={handleSubmit} disabled={Object.keys(userAnswers).length !== questions.length}>
        Submit Quiz
      </button>
    </div>
  );
}

export default Quiz;
