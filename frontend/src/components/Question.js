import React from 'react';

function Question({ question, questionIndex, onAnswerSelect }) {
  const handleOptionChange = (event) => {
    onAnswerSelect(questionIndex, event.target.value);
  };

  return (
    <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
      <h3>{question.question}</h3>
      {question.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question;
