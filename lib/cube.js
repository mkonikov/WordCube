import Letter from './letter.js';
import Selection from './selection.js';
import Dice from './dice.js';
import Word from './word.js';

class Cube {
  constructor(game) {
    this.game = game;
    this.cube = document.querySelector('#cube ul');
    this.letters = {};
    this.shuffleCube = this.shuffleCube.bind(this);
    this.shuffleCube();
    this.scoreDiv = document.querySelector('#score');
    this.calcHighScore = this.calcHighScore.bind(this);
  }

  startRound() {
    this.score = 0;
    this.selection = new Selection ();
    this.timerStarted = false;
    this.guessedWords = [];
    this.selecting = false;
    this.letters = {};
    this.shuffleCube();
    this.bindCube();
    this.updateScore(0);
    this.scoreDiv.className = 'show-score';
  }

  updateScore(points) {
    this.score += points;
    document.title = `WordCube (${this.score})`;
    this.scoreDiv.innerHTML = `Current Score: <strong>${this.score}</strong>`;
  }

  endGame() {
    this.selecting = false;
    this.calcHighScore();
    if (this.selection) this.selection.resetSelection();
    this.cube.removeEventListener("click", this.clickHandle);
    this.cube.removeEventListener("touchstart", this.clickHandle);
    this.cube.removeEventListener("touchend", this.clickHandle);
    this.cube.removeEventListener("mouseover", this.mouveoverHandle);
    this.cube.removeEventListener("touchmove", this.mouveoverHandle);
  }

  calcHighScore() {
    if (!localStorage.getItem('highScore') && this.score > 0 ||
    Number(localStorage.getItem('highScore')) < this.score) {
      localStorage.setItem('highScore', this.score);
      this.game.renderHighScore();
    }
  }

  shuffleCube() {
    this.cube.innerHTML = "";
    const dice = Dice.rollDice();
    [0, 1, 2, 3, 4].forEach((y) => {
      [0, 1, 2, 3, 4].forEach((x) => {
        const letterOptions = {
          coords: [x, y],
          character: dice.pop()[Math.floor(Math.random() * 5)]
        };
        const newLetter = new Letter(letterOptions);
        this.letters[[x,y]] = newLetter;
        newLetter.render();
        if (this.selection) {
          newLetter.animate();
        }
      });
    });
  }

  submitWord() {
    if (Word.validWord(this.selection.selectionChars(), this.guessedWords)) {
      const validWord = new Word(this.selection.selectionChars(), this);
      this.guessedWords.push(validWord);
    }
    this.selection.resetSelection();
  }

  logLetter(e) {
    if (this.selecting && e.target.nodeName === "LI") {
      const letter = this.letters[e.target.dataset.key];
      this.selection.addLetter(letter);
    }
    e.stopPropagation();
  }

  toggleSelecting(e) {
    if (this.selecting) {
      this.submitWord();
    } else if (e.target.nodeName === "LI") {
      const letter = this.letters[e.target.dataset.key];
      this.selection.addLetter(letter);
    }
    this.selecting = !this.selecting;
  }

  bindCube() {
    this.clickHandle = e => this.toggleSelecting(e);
    this.mouseoverHandle = e => this.logLetter(e);
    this.cube.addEventListener("click", this.clickHandle);
    this.cube.addEventListener("touchstart", this.clickHandle);
    this.cube.addEventListener("touchend", this.clickHandle);
    this.cube.addEventListener("mouseover", this.mouseoverHandle);
    this.cube.addEventListener("touchmove", this.mouseoverHandle);
  }

}

export default Cube;
