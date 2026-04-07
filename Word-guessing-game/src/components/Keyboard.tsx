import React, { useEffect } from 'react';

interface KeyboardProps {
  guessedLetters: string[];
  wrongLetters: string[];
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const KEYS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

export const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, wrongLetters, onGuess, disabled }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const key = e.key.toUpperCase();
      if (KEYS.includes(key)) {
        onGuess(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, onGuess]);

  const allGuessed = new Set([...guessedLetters, ...wrongLetters]);

  return (
    <div className="keyboard">
      {KEYS.map((key) => {
        const isGuessed = allGuessed.has(key);
        return (
          <button
            key={key}
            onClick={() => onGuess(key)}
            className="key-button"
            disabled={disabled || isGuessed}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};
