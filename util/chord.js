class Chord {
  constructor(tone, chordQuality, color, x, y, width, height) {
    this.tone = tone;
    this.chordQuality = chordQuality;
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.isActive = false;
  }

  getRootNote() {
    return this.tone + "4";
  }

  getChord() {
    return [this.getRootNote()];
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  setActive() {
    this.isActive = true;
  }

  setInactive() {
    this.isActive = false;
  }

  show() {
    if (this.isActive) {
      fill(this.color);
    } else {
      fill("white");
    }
    rect(this.x, this.y, this.width, this.height);
  }

  getBoundary() {
    // returns (x1, y1, x2, y2) that defines boundary
    return [this.x, this.y, this.x + this.width, this.y + this.height];
  }

  doesCollide(x, y) {
    // determines if x,y is in the boundary of Chord
    let [x1, y1, x2, y2] = this.getBoundary();
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
  }
}
