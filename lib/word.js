import { dictionary } from './dictionary.js';

class Word {
  constructor(word, cube) {
    this.word = word;
    this.cube = cube;
    this.calcPoints();
    this.guessedUl = document.querySelector('#guessed-words');
    this.renderGuessedWord();
  }

  static validWord(word, prevGuesses) {
    return (!Word.previouslyGuessed(word, prevGuesses) &&
      Word.searchDictionary(dictionary, word));
  }

  static previouslyGuessed(word, prevGuesses) {
    return prevGuesses.some((guess) => {
      return guess.word === word;
    });
  }

  static searchDictionary(dictionary, word) {
    if (dictionary.length < 1) return false;

    const midpoint = Math.floor(dictionary.length / 2);

    if (dictionary[midpoint] === word) {
      return true;
    } else if (dictionary[midpoint] > word) {
      return this.searchDictionary(dictionary.slice(0, midpoint), word);
    } else {
      return this.searchDictionary(dictionary.slice(midpoint + 1), word);
    }

    return false;
  }

  calcPoints() {
    if (this.word.length === 4) {
      this.points = 1;
    } else if (this.word.length === 5) {
      this.points = 2;
    } else if (this.word.length === 6) {
      this.points = 3;
    } else if (this.word.length === 7) {
      this.points = 5;
    } else if (this.word.length > 7) {
      this.points = 11;
    }
  }

  renderGuessedWord(word) {
    const li = document.createElement("li");
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = this.word;
    const scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = this.points;
    li.append(wordDiv, scoreDiv);
    this.guessedUl.append(li);
    this.cube.updateScore(this.points);
  }

}

export default Word;
