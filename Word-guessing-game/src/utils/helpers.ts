import { wordList } from "./wordList";
import type { WordData } from "../types/game";

export function getRandomWordData(): WordData {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

export function isGameWon(word: string, guessedLetters: string[]): boolean {
  return word.split("").every(letter => guessedLetters.includes(letter));
}
