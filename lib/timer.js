class Timer {
  constructor(game) {
    this.game = game;
    this.width = 0;
    this.timerNode = document.querySelector('#timer');
    this.widenTimer = this.widenTimer.bind(this);
  }

  startTimer() {
    this.timerIntervalId = setInterval(this.widenTimer, 1000);
    this.timerNode.className = '';
  }

  clearTimer() {
    this.width = 0;
    this.timerNode.style.width=`0%`;
    clearInterval(this.timerIntervalId);
  }

  widenTimer() {
    if (this.width >= 100) {
      this.endTimer();
      this.game.showGameOverModal();
    } else {
      this.width += 0.83333333333;
      this.timerNode.style.width=`${this.width}%`;
    }
    if (this.width >= 95) {
      this.timerNode.className = 'end';
    }
  }
  endTimer() {
    clearInterval(this.timerIntervalId);
    this.game.endGame();
  }

}

export default Timer;
