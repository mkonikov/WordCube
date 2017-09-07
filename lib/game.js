import Cube from './cube.js';

class Game {
  constructor() {
    this.bindCube();
    this.selection = "";
    this.selecting = false;
    this.prevCoords = [];
  }

  handleLetterSelection(moveData) {
    if (this.checkMove(moveData)) {
      const hoveredLetter = moveData.value;
      this.selection += hoveredLetter;
      console.log(this.selection);
    }
  }

  checkMove(pos) {
    const x = parseInt(pos.x);
    const y = parseInt(pos.y);

    if (this.prevCoords.length < 1) {
      this.prevCoords.push([x, y]);
      return true;
    }

    const last = this.prevCoords.length - 1;
    const xDiff = x - this.prevCoords[last][0];
    const yDiff = y - this.prevCoords[last][1];
    const actuallyMoved = [xDiff, yDiff] !== [0, 0];
    const xNeighbor = [-1, 0, 1].includes(xDiff);
    const yNeighbor = [-1, 0, 1].includes(yDiff);
    const pastPos = this.prevCoords.some(el => el.join() === [x,y].join());

    if (this.prevCoords.length < 1 ||
      actuallyMoved && !pastPos &&
      xNeighbor && yNeighbor) {
      this.prevCoords.push([x, y]);
      return true;
    } else {
      return false;
    }

  }

  logLetter(e) {
    if (this.selecting && e.target.nodeName === "LI") {
      this.handleLetterSelection(e.target.dataset);
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
      debugger;
      this.handleLetterSelection(e.target.dataset);
    }
    this.selecting = !this.selecting;
  }

  bindCube() {
    const cube = document.querySelector('#cube');
    cube.addEventListener("click", e => this.toggleSelecting(e));
    cube.addEventListener("mouseover", e => this.logLetter(e));
  }

}

export default Game;
