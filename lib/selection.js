class Selection {
  constructor() {
    this.letters = [];
    this.selectionDiv = document.querySelector('#selection');
  }

  addLetter(letter) {
    if (this.checkMove(letter)) {
      this.letters.push(letter);
      letter.toggleHighlight();
      this.renderSelection();
    }
  }

  resetSelection() {
    this.letters.forEach(letter => letter.toggleHighlight());
    this.letters = [];
    this.renderSelection();
  }

  selectionChars() {
    return this.letters.map(letter => letter.character).join("");
  }

  renderSelection() {
    this.selectionDiv.innerHTML = this.selectionChars();
  }

  checkMove(letter) {
    if (this.letters.length < 1) {
      return true;
    }

    const last = this.letters.length - 1;
    const diff = letter.calcDiff(this.letters[last]);
    const actuallyMoved = diff !== [0, 0];
    const xNeighbor = [-1, 0, 1].includes(diff[0]);
    const yNeighbor = [-1, 0, 1].includes(diff[1]);
    const pastPos = this.letters.some(el => letter.samePosition(el));
    return (actuallyMoved && !pastPos &&
      xNeighbor && yNeighbor);

  }

}

export default Selection;
