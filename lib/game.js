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
    this.highScoreNode = document.querySelector('#high-score');
    this.renderHighScore();
    this.bindScore();
    this.scoreScheme = document.querySelector('#score-scheme');
    this.gameOverModal = document.querySelector('#game-over-modal');
  }

  renderRestart() {
    if (!this.restartRendered) {
      this.startButton.innerHTML = "Restart";
      this.restartRendered = true;
    }
  }

  renderHighScore() {
    if (localStorage.getItem('highScore')) {
      this.highScoreNode.className = 'show-score';
      this.highScoreNode.innerHTML = `Your High Score:
      <strong>${localStorage.getItem('highScore')}</strong>`;
    }
  }

  bindStart() {
    this.startButton.addEventListener("click", this.startRound);
    document.querySelector('#play-again').addEventListener("click", this.startRound);
  }

  showGameOverModal() {
    const modalScore = document.querySelector('#modal-score');
    modalScore.innerHTML = this.cube.score;
    this.gameOverModal.className = 'active';
  }

  hideGameOverModal() {
    this.gameOverModal.className = '';
  }

  showScoreScheme() {
    return (e) => {
      const xPositionNum = Number(e.clientX);
      const yPosition = Number(e.clientY) - 260;
      let xPosition = (xPositionNum - 100 > 10) ? xPositionNum - 100 : xPositionNum - 5;
      this.scoreScheme.classList.add('active');
      this.scoreScheme.style = `top: ${yPosition}px; left: ${xPosition}px`;
    };
  }
  hideScoreScheme() {
    this.scoreScheme.classList.remove('active');
  }

  bindScore() {
    const scoreInstructions = document.querySelector('#score-instructions');
    const wordInstructions = document.querySelector('#word-instructions');
    scoreInstructions.addEventListener('mouseover', this.showScoreScheme().bind(this));
    wordInstructions.addEventListener('mouseout', this.hideScoreScheme.bind(this));
  }

  clearRenderedLists() {
    this.guessedUl.innerHTML = "";
    this.selectionDiv.innerHTML = "";
  }

  startRound() {
    this.timer.clearTimer();
    this.hideGameOverModal();
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
