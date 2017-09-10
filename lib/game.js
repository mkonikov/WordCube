import Cube from './cube.js';
import Timer from './timer.js';
import Word from './word.js';

class Game {
  constructor() {
    this.cube = new Cube(this);
    this.timer = new Timer(this);
    this.restartRendered = false;
    this.clearRenderedLists = this.clearRenderedLists.bind(this);
    this.startRound = this.startRound.bind(this);
    this.guessedUl = document.querySelector('#guessed-words');
    this.selectionDiv = document.querySelector('#selection');
    this.startButton = document.querySelector('#start');
    this.bindStart();
  }

  renderRestart() {
    if (!this.restartRendered) {
      this.startButton.innerHTML = "Restart";
      this.restartRendered = true;
    }
  }

  bindStart() {
    this.startButton.addEventListener("click", this.startRound);
  }

  clearRenderedLists() {
    this.guessedUl.innerHTML = "";
    this.selectionDiv.innerHTML = "";
  }

  startRound() {
    this.timer.clearTimer();
    this.endGame();
    this.timer.startTimer();
    this.renderRestart();
    this.clearRenderedLists();
    this.cube.startRound();
  }

  endGame() {
    this.cube.endGame();
    this.selectionDiv.innerHTML = "";
  }

}

export default Game;
