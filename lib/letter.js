class Letter {
  constructor(options) {
    this.coords = options.coords;
    this.character = options.character;
  }

  render() {
    const cube = document.querySelector('#cube ul');
    const li = document.createElement("li");
    li.dataset.key = this.coords;
    li.innerHTML = this.character;
    cube.append(li);
  }

  samePostion(otherLetter) {
    return this.coords.join() === otherLetter.coords.join();
  }

  calcDiff(otherLetter) {
    const x = this.coords[0] - otherLetter.coords[0];
    const y = this.coords[1] - otherLetter.coords[1];
    return [x,y];
  }
}

export default Letter;
