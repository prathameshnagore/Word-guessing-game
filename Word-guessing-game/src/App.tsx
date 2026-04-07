import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import { WordDisplay } from './components/WordDisplay';
import { Hint } from './components/Hint';
import { Keyboard } from './components/Keyboard';
import { GameStatus } from './components/GameStatus';
import { getRandomWordData, isGameWon } from './utils/helpers';
import type { GameState } from './types/game';

const MAX_ATTEMPTS = 6;

function App() {
  const [gameState, setGameState] = useState<GameState>({
    word: "",
    hint: "",
    guessedLetters: [],
    wrongLetters: [],
    attemptsLeft: MAX_ATTEMPTS,
    status: "PLAYING"
  });

  const initGame = useCallback(() => {
    const { word, hint } = getRandomWordData();
    setGameState({
      word,
      hint,
      guessedLetters: [],
      wrongLetters: [],
      attemptsLeft: MAX_ATTEMPTS,
      status: "PLAYING"
    });
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGuess = useCallback((letter: string) => {
    setGameState((prevState) => {
      if (prevState.status !== "PLAYING") return prevState;
      if (prevState.guessedLetters.includes(letter) || prevState.wrongLetters.includes(letter)) {
        return prevState;
      }

      const isCorrect = prevState.word.includes(letter);
      const newGuessedLetters = isCorrect ? [...prevState.guessedLetters, letter] : prevState.guessedLetters;
      const newWrongLetters = !isCorrect ? [...prevState.wrongLetters, letter] : prevState.wrongLetters;
      const newAttemptsLeft = MAX_ATTEMPTS - newWrongLetters.length;
      
      let newStatus = prevState.status;
      if (isGameWon(prevState.word, newGuessedLetters)) {
        newStatus = "WON";
      } else if (newAttemptsLeft <= 0) {
        newStatus = "LOST";
      }

      return {
        word: prevState.word,
        hint: prevState.hint,
        guessedLetters: newGuessedLetters,
        wrongLetters: newWrongLetters,
        attemptsLeft: newAttemptsLeft,
        status: newStatus
      };
    });
  }, []);

  if (!gameState.word) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="game-box">
        <h1>Word Guessing Game</h1>
        
        <Hint hint={gameState.hint} />
        
        <WordDisplay 
          word={gameState.word} 
          guessedLetters={gameState.guessedLetters} 
        />
        
        <div className="wrong-guesses">
          Wrong Guesses: {gameState.wrongLetters.map((letter, i) => (
            <span key={i} className="wrong-letter">{letter}</span>
          ))}
          <br />
          Attempts Left: {gameState.attemptsLeft} / {MAX_ATTEMPTS}
        </div>

        <Keyboard 
          guessedLetters={gameState.guessedLetters}
          wrongLetters={gameState.wrongLetters}
          onGuess={handleGuess}
          disabled={gameState.status !== "PLAYING"}
        />

        <GameStatus 
          status={gameState.status} 
          word={gameState.word} 
          onRestart={initGame} 
        />
      </div>
    </div>
  );
}

export default App;
