import Cube from './cube.js';
import Timer from './timer.js';


class Game {
  constructor() {
    this.cube = new Cube(this);
    this.timer = new Timer(this);
    this.restartRendered = false;
    this.guessedUl = document.querySelector('#guessed-words');
    this.selectionDiv = document.querySelector('#selection');
    this.clearRenderedLists = this.clearRenderedLists.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  startGame() {
    this.timer.startTimer();
    this.renderRestart();
  }
  renderRestart() {
    if (!this.restartRendered) {
      const nav = document.querySelector('nav');
      const button = document.createElement("button");
      button.innerHTML = "Restart";
      button.addEventListener("click", this.restartGame);
      nav.append(button);
      this.restartRendered = true;
    }
  }
  clearRenderedLists() {
    this.guessedUl.innerHTML = "";
    this.selectionDiv.innerHTML = "";
  }
  restartGame() {
    this.timer.clearTimer();
    this.endGame();
    this.clearRenderedLists();
    this.cube.restartGame();
  }

  renderGuessedWord(word) {
    const li = document.createElement("li");
    li.innerHTML = word;
    this.guessedUl.append(li);
  }
  renderSelection(selection) {
    this.selectionDiv.innerHTML = selection;
  }

  endGame() {
    this.cube.endGame();
    this.selectionDiv.innerHTML = "";
  }

}

export default Game;
