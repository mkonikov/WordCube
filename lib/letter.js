class Letter {
  constructor(letterData) {
    this.coords = [parseInt(letterData.x), parseInt(letterData.y)];
    this.character = letterData.value;
  }
}

export default Letter;
