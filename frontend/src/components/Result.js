import React, { useState } from 'react';

function Result({ score, total, onReset, questions, userAnswers, correctAnswers }) {
  const [showReview, setShowReview] = useState(false);
  
  const percentage = Math.round((score / total) * 100);
  const getEmoji = () => {
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '😊';
    return '💪';
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>
        {getEmoji()}
      </div>
      
      <h2 style={{ 
        marginBottom: '25px',
        fontSize: '28px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        Quiz Complete!
      </h2>
      
      <div style={{ 
        fontSize: '36px', 
        fontWeight: 'bold',
        marginBottom: '20px',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {score} / {total}
      </div>
      
      <p style={{ 
        fontSize: '20px', 
        marginBottom: '30px',
        color: '#fff',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
      }}>
        {percentage === 100 ? 'Perfect score! You\'re a quiz master! 🎉' : 
         percentage >= 80 ? 'Excellent work! 🌟' :
         percentage >= 60 ? 'Good job! 👏' :
         percentage >= 40 ? 'Not bad! Keep practicing! 📚' :
         'Keep trying! You\'ll get better! 💪'}
      </p>
      
      <div style={{ 
        fontSize: '18px', 
        marginBottom: '30px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px'
      }}>
        Accuracy: {percentage}%
      </div>

      <div style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => setShowReview(!showReview)}
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            marginRight: '15px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}
        >
          {showReview ? '📊 Hide Review' : '📝 Review Answers'}
        </button>
        
        <button 
          onClick={onReset}
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}
        >
          🔄 Take New Quiz
        </button>
      </div>

      {showReview && (
        <div style={{ 
          textAlign: 'left',
          marginTop: '30px',
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '25px',
            color: '#fff',
            fontSize: '22px'
          }}>
            📋 Answer Review
          </h3>
          
          {questions.map((question, index) => {
            const isCorrect = userAnswers[index] === correctAnswers[index];
            return (
              <div key={index} style={{
                marginBottom: '25px',
                padding: '20px',
                background: isCorrect 
                  ? 'rgba(76, 175, 80, 0.2)' 
                  : 'rgba(244, 67, 54, 0.2)',
                borderRadius: '15px',
                border: isCorrect 
                  ? '2px solid rgba(76, 175, 80, 0.5)'
                  : '2px solid rgba(244, 67, 54, 0.5)'
              }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#fff'
                }}>
                  {isCorrect ? '✅' : '❌'} Question {index + 1}
                </div>
                
                <div style={{ 
                  fontSize: '16px', 
                  marginBottom: '15px',
                  color: '#fff',
                  lineHeight: '1.4'
                }}>
                  {question.question}
                </div>
                
                <div style={{ fontSize: '14px', color: '#fff' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Your answer:</strong> 
                    <span style={{ 
                      color: isCorrect ? '#4caf50' : '#f44336',
                      marginLeft: '8px'
                    }}>
                      {userAnswers[index] || 'No answer'}
                    </span>
                  </div>
                  
                  {!isCorrect && (
                    <div>
                      <strong>Correct answer:</strong> 
                      <span style={{ 
                        color: '#4caf50',
                        marginLeft: '8px'
                      }}>
                        {correctAnswers[index]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Result;
