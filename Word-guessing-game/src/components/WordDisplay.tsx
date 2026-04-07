import React from 'react';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  return (
    <div className="word-display">
      {word.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter);
        return (
          <div key={index} className="letter-box">
            {isGuessed ? letter : ""}
          </div>
        );
      })}
    </div>
  );
};
