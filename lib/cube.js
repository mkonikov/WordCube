import Letter from './letter.js';
import { dictionary } from './dictionary.js';

const DICE = [
  ['a', 'a', 'a', 'f', 'r', 's'],
  ['a', 'a', 'e', 'e', 'e', 'e'],
  ['a', 'a', 'f', 'i', 'r', 's'],
  ['a', 'd', 'e', 'n', 'n', 'n'],
  ['a', 'e', 'e', 'e', 'e', 'm'],
  ['a', 'e', 'e', 'g', 'm', 'u'],
  ['a', 'e', 'g', 'm', 'n', 'n'],
  ['a', 'f', 'i', 'r', 's', 'y'],
  ['b', 'j', 'k', 'q', 'x', 'z'],
  ['c', 'c', 'e', 'n', 's', 't'],
  ['c', 'e', 'i', 'i', 'l', 't'],
  ['c', 'e', 'i', 'l', 'p', 't'],
  ['c', 'e', 'i', 'p', 's', 't'],
  ['d', 'd', 'h', 'n', 'o', 't'],
  ['d', 'h', 'h', 'l', 'o', 'r'],
  ['d', 'h', 'l', 'n', 'o', 'r'],
  ['d', 'h', 'l', 'n', 'o', 'r'],
  ['e', 'i', 'i', 'i', 't', 't'],
  ['e', 'm', 'o', 't', 't', 't'],
  ['e', 'n', 's', 's', 's', 'u'],
  ['f', 'i', 'p', 'r', 's', 'y'],
  ['g', 'o', 'r', 'r', 'v', 'w'],
  ['i', 'p', 'r', 'r', 'r', 'y'],
  ['n', 'o', 'o', 't', 'u', 'w'],
  ['o', 'o', 'o', 't', 't', 'u']
];

class Cube {
  constructor(game) {
    this.game = game;
    this.timerStarted = false;
    this.selecting = false;
    this.guessedWords = [];
    this.cube = document.querySelector('#cube ul');
    this.letters = {};
    this.prevLetters = [];
    this.selection = "";
    this.bindCube();
    this.shuffleCube();
  }

  restartGame() {
    this.timerStarted = false;
    this.guessedWords = false;
    this.selecting = false;
    this.letters = {};
    this.prevLetters = [];
    this.selection = [];
    this.shuffleCube();
    this.bindCube();
  }

  endGame() {
    this.selecting = false;
    this.cube.removeEventListener("click", this.clickHandle);
    this.cube.removeEventListener("mouseover", this.mouveoverHandle);
  }

  searchDictionary(dictionary, word) {
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

  shuffleCube() {
    this.cube.innerHTML = "";
    let id = 0;
    [0, 1, 2, 3, 4].forEach((y) => {
      [0, 1, 2, 3, 4].forEach((x) => {
        const letterOptions = {
          coords: [x, y],
          character: DICE[id][Math.floor(Math.random() * 5)]
        };
        const newLetter = new Letter(letterOptions);
        this.letters[[x,y]] = newLetter;
        newLetter.render();
        id++;
      });
    });
  }

  handleLetterSelection(letter) {
    if (this.checkMove(letter)) {
      const hoveredLetter = letter.character;
      this.selection += letter.character;
      this.game.renderSelection(this.selection);
    }
  }

  checkMove(letter) {
    if (this.prevLetters.length < 1) {
      this.prevLetters.push(letter);
      return true;
    }

    const last = this.prevLetters.length - 1;
    const diff = letter.calcDiff(this.prevLetters[last]);
    const actuallyMoved = diff !== [0, 0];
    const xNeighbor = [-1, 0, 1].includes(diff[0]);
    const yNeighbor = [-1, 0, 1].includes(diff[1]);
    const pastPos = this.prevLetters.some(el => letter.samePostion(el));

    if (this.prevLetters.length < 1 ||
      actuallyMoved && !pastPos &&
      xNeighbor && yNeighbor) {
      this.prevLetters.push(letter);
      return true;
    } else {
      return false;
    }

  }

  logLetter(e) {
    if (this.selecting && e.target.nodeName === "LI") {
      const letter = this.letters[e.target.dataset.key];
      this.handleLetterSelection(letter);
    }
    e.stopPropagation();
  }

  submitWord() {
    const newWord = this.selection;
    if (this.searchDictionary(dictionary, newWord) && !this.guessedWords.includes(newWord)) {
      this.guessedWords.push(newWord);
      this.game.renderGuessedWord(newWord);
    }
    console.log(this.guessedWords);
    this.selection = "";
    this.prevLetters = [];
  }

  toggleSelecting(e) {
    if (this.selecting) {
      this.submitWord();
    } else {
      if (!this.timerStarted) {
        this.game.startGame();
        this.timerStarted = true;
      }
      const letter = this.letters[e.target.dataset.key];
      this.handleLetterSelection(letter);
    }
    this.selecting = !this.selecting;
  }

  bindCube() {
    this.clickHandle = e => this.toggleSelecting(e);
    this.mouseoverHandle = e => this.logLetter(e);
    this.cube.addEventListener("click", this.clickHandle);
    this.cube.addEventListener("mouseover", this.mouseoverHandle);
  }

}

export default Cube;
