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
  constructor() {
    this.cube = document.querySelector('#cube ul');
    this.bindCube();
    this.selection = "";
    this.selecting = false;
    this.prevCoords = [];
    this.guessedWords = [];
    this.letters = {};
    this.shuffleCube();
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
    console.log(this.letters);
  }

  handleLetterSelection(letter) {
    if (this.checkMove(letter)) {
      const hoveredLetter = letter.character;
      this.selection += letter.character;
      console.log(this.selection);
    }
  }

  checkMove(letter) {
    if (this.prevCoords.length < 1) {
      this.prevCoords.push(letter.coords);
      return true;
    }

    const last = this.prevCoords.length - 1;
    const xDiff = letter.coords[0] - this.prevCoords[last][0];
    const yDiff = letter.coords[1] - this.prevCoords[last][1];
    const actuallyMoved = [xDiff, yDiff] !== [0, 0];
    const xNeighbor = [-1, 0, 1].includes(xDiff);
    const yNeighbor = [-1, 0, 1].includes(yDiff);
    const pastPos = this.prevCoords.some(el => el.join() === letter.coords.join());

    if (this.prevCoords.length < 1 ||
      actuallyMoved && !pastPos &&
      xNeighbor && yNeighbor) {
      this.prevCoords.push(letter.coords);
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
    }
    console.log(this.guessedWords);
    this.selection = "";
    this.prevCoords = [];
  }

  toggleSelecting(e) {
    if (this.selecting) {
      this.submitWord();
    } else {
      const letter = this.letters[e.target.dataset.key];
      this.handleLetterSelection(letter);
    }
    this.selecting = !this.selecting;
  }

  bindCube() {
    this.cube.addEventListener("click", e => this.toggleSelecting(e));
    this.cube.addEventListener("mouseover", e => this.logLetter(e));
  }

}

export default Cube;
