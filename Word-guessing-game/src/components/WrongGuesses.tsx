import React from 'react';

interface WrongGuessesProps {
  wrongLetters: string[];
  maxAttempts: number;
}

export const WrongGuesses: React.FC<WrongGuessesProps> = ({ wrongLetters, maxAttempts }) => {
  const attemptsLeft = maxAttempts - wrongLetters.length;
  const isCritical = attemptsLeft <= 2;

  return (
    <div className="wrong-guesses-container">
      <div className="mistakes-label">
        Mistakes Remaining: <span className={`mistakes-count ${isCritical ? 'critical' : ''}`}>{attemptsLeft}</span> / {maxAttempts}
      </div>
      
      <div className="bubbles-wrapper">
        {Array.from({ length: maxAttempts }).map((_, i) => {
          const letter = wrongLetters[i];
          const className = `mistake-bubble ${letter ? 'filled' : ''}`;
          
          return (
            <div key={i} className={className}>
              {letter || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};
