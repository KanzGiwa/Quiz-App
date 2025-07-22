import React from 'react';

function Result({ score, total }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Quiz Complete!</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        You scored {score} out of {total}
      </p>
      <p>
        {score === total ? 'Perfect score!' : `${Math.round((score / total) * 100)}% correct`}
      </p>
    </div>
  );
}

export default Result;
