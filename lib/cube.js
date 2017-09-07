import Letter from './letter.js';

const TOP = ['a', 'e', 'i', 'o', 't'];
const FREQUENT = ['h', 'n', 'r', 's'];
const OFTEN = ['c', 'd', 'l', 'u'];
const RARE = ['b', 'f', 'g', 'k', 'm', 'p', 'v', 'w', 'y', 'j'];
const RAREST = ['z', 'x', 'q'];

class Cube {
  constructor() {
    this.bindCube();
    this.selection = "";
    this.selecting = false;
    this.prevCoords = [];
    this.letters = [];
    this.shuffleCube();
  }

  randomLetters() {
    return [].concat(
      TOP, TOP, TOP, TOP, TOP,
      FREQUENT, FREQUENT, FREQUENT, FREQUENT,
      OFTEN, OFTEN, OFTEN,
      RARE, RARE,
      RAREST);
  }

  shuffleCube() {
    [0, 1, 2].forEach((y) => {
      [0, 1, 2].forEach((x) => {
        const availableLetters = this.randomLetters();
        const letterOptions = {
          coords: [x, y],
          character: availableLetters[Math.floor(Math.random() * availableLetters.length)]
        };
        this.letters.push(new Letter(letterOptions));
      });
    });
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
      const letter = new Letter(e.target.dataset);
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
      const letter = new Letter(e.target.dataset);
      this.handleLetterSelection(letter);
    }
    this.selecting = !this.selecting;
  }

  bindCube() {
    const cube = document.querySelector('#cube');
    cube.addEventListener("click", e => this.toggleSelecting(e));
    cube.addEventListener("mouseover", e => this.logLetter(e));
  }

}

export default Cube;
