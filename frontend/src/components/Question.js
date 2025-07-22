import React from 'react';

function Question({ question, questionIndex, onAnswerSelect }) {
  const handleOptionChange = (event) => {
    onAnswerSelect(questionIndex, event.target.value);
  };

  return (
    <div style={{ 
      margin: '25px 0', 
      padding: '30px', 
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.2s ease'
    }}>
      <h3 style={{ 
        marginBottom: '25px', 
        fontSize: '20px', 
        lineHeight: '1.5',
        color: '#fff',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
      }}>
        ❓ {question.question}
      </h3>
      
      {question.options.map((option, index) => (
        <div key={index} style={{ 
          margin: '15px 0',
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: '2px solid transparent'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          e.target.style.borderColor = 'rgba(78, 205, 196, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.borderColor = 'transparent';
        }}
        >
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            width: '100%'
          }}>
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              onChange={handleOptionChange}
              style={{
                width: '25px',
                height: '25px',
                marginRight: '15px',
                transform: 'scale(1.3)',
                accentColor: '#4ecdc4'
              }}
            />
            <span style={{ 
              fontSize: '16px',
              color: '#fff',
              textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
            }}>
              {option}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question;
