import React from 'react';
import type { GameStatus as GameStatusType } from '../types/game';

interface GameStatusProps {
  status: GameStatusType;
  word: string;
  onRestart: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ status, word, onRestart }) => {
  if (status === "PLAYING") return null;

  const isWon = status === "WON";

  return (
    <div className={`status-message ${isWon ? 'status-won' : 'status-lost'}`}>
      <p>{isWon ? "Congratulations! You won!" : `Game Over! The word was: ${word}`}</p>
      <button onClick={onRestart} className="restart-button">Play Again</button>
    </div>
  );
};
