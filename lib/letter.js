class Letter {
  constructor(options) {
    this.coords = options.coords;
    this.character = options.character;
  }

  render(stage) {
    const cube = document.querySelector('#cube ul');
    this.li = document.createElement("li");
    this.li.dataset.key = this.coords;
    this.li.innerHTML = this.character;
    cube.append(this.li);
  }

  animate() {
    this.li.className = 'animate';
    setTimeout(() => this.li.className = "", 800);
  }

  toggleHighlight() {
    if (this.li.classList.length > 0) {
      this.li.classList.remove('highlight');
    } else {
      this.li.className = 'highlight';
    }
  }

  samePosition(otherLetter) {
    return this.coords.join() === otherLetter.coords.join();
  }

  calcDiff(otherLetter) {
    const x = this.coords[0] - otherLetter.coords[0];
    const y = this.coords[1] - otherLetter.coords[1];
    return [x,y];
  }
}

export default Letter;
