export type GameStatus = "PLAYING" | "WON" | "LOST";

export interface WordData {
  word: string;
  hint: string;
}

export interface GameState {
  word: string;
  hint: string;
  guessedLetters: string[];
  wrongLetters: string[];
  attemptsLeft: number;
  status: GameStatus;
}
