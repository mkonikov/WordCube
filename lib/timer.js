class Timer {
  constructor(game) {
    this.game = game;
    this.width = 0;
    this.timerNode = document.querySelector('#timer');
    this.widenTimer = this.widenTimer.bind(this);
  }

  startTimer() {
    this.timerIntervalId = setInterval(this.widenTimer, 1000);
  }

  clearTimer() {
    this.width = 0;
    this.timerNode.style.width=`0%`;
    clearInterval(this.timerIntervalId);
  }

  widenTimer() {
    if (this.width >= 10) {
      this.endTimer();
    } else {
      this.width += 0.55555555555;
      this.timerNode.style.width=`${this.width}%`;
    }
  }
  endTimer() {
    clearInterval(this.timerIntervalId);
    this.game.endGame();
  }

}

export default Timer;
