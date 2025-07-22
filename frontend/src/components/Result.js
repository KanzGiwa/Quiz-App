import React from 'react';

function Result({ score, total, onReset }) {
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
      maxWidth: '500px',
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
      
      <button 
        onClick={onReset}
        style={{
          padding: '20px 40px',
          fontSize: '18px',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}
      >
        🔄 Take New Quiz
      </button>
    </div>
  );
}

export default Result;
