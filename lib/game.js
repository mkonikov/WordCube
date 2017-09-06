import Cube from './cube.js';

class Game {
  constructor() {
    this.bindLetters();
    this.selection = "";
    this.selecting = false;
  }

  addLetterToSelection(e) {
    const hoveredLetter = e.target.dataset.value;
    this.selection += hoveredLetter;
  }

  logLetter(e) {
    if (this.selecting && e.target.nodeName === "LI") {
      this.addLetterToSelection(e);
    }
    e.stopPropagation();
  }

  toggleSelecting(e) {
    if (this.selecting) {
      console.log(this.selection);
      this.selection = "";
    } else {
      this.addLetterToSelection(e);
    }
    this.selecting = !this.selecting;
    // console.log(`Selecting: ${this.selecting}`);
  }

  bindLetters() {
    const cube = document.querySelector('#cube');
    cube.addEventListener("click", e => this.toggleSelecting(e));
    cube.addEventListener("mouseover", e => this.logLetter(e));
  }

}

export default Game;
