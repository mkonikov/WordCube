import Letter from './letter.js';
import { dictionary } from './dictionary.js';

const TOP = ['a', 'e', 'i', 'o', 't'];
const FREQUENT = ['h', 'n', 'r', 's'];
const OFTEN = ['c', 'd', 'l', 'u'];
const RARE = ['b', 'f', 'g', 'k', 'm', 'p', 'v', 'w', 'y', 'j'];
const RAREST = ['z', 'x', 'q'];

class Cube {
  constructor() {
    this.cube = document.querySelector('#cube ul');
    this.bindCube();
    this.selection = "";
    this.selecting = false;
    this.prevCoords = [];
    this.letters = {};
    this.shuffleCube();
    this.renderBoard();
  }

  searchDictionary(dictionary) {
    const midpoint = dictionary.length / 2;

    if (dictionary[midpoint] === this.selection) {
      return true;
    } else if (dictionary[midpoint] > this.selection) {
      searchDictionary(dictionary.slice(0, midpoint));
    } else {
      searchDictionary(dictionary.slice(midpoint + 1));
    }

    return false;

  }

  validWord() {


  }

  randomLetters() {
    return [].concat(
      TOP, TOP, TOP, TOP, TOP, TOP,
      FREQUENT, FREQUENT, FREQUENT, FREQUENT, FREQUENT,
      OFTEN, OFTEN, OFTEN, OFTEN,
      RARE, RARE,
      RAREST);
  }

  renderBoard() {

    const keys = Object.keys(this.letters);

    keys.forEach((key) => {
      const letter = this.letters[key];
      const singleLI = document.createElement("li");
      singleLI.dataset.key = letter.coords;
      singleLI.innerHTML = letter.character;
      this.cube.append(singleLI);
    });

  }

  shuffleCube() {
    [0, 1, 2, 3, 4, 5].forEach((y) => {
      [0, 1, 2, 3, 4, 5].forEach((x) => {
        const availableLetters = this.randomLetters();
        const letterOptions = {
          coords: [x, y],
          character: availableLetters[Math.floor(Math.random() * availableLetters.length)]
        };
        this.letters[[x,y]] = new Letter(letterOptions);
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
