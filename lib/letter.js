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
}

export default Letter;
