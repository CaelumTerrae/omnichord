// CONSTANTS
let buttonWidth, buttonHeight;
const chordButtons = [];
const noteNames = [
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
];

const modeNames = ["Maj", "Min", "7th"];

function setup() {
  // INITIALIZING CONSTANTS
  buttonWidth = (windowWidth * 2) / 39;
  buttonHeight = windowHeight / 7;

  // CANVAS SETUP
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, TOP);
  textSize(windowWidth / 85);
  background(0);
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 12; x++) {
      chordButtons.push(
        new Chord(
          noteNames[x],
          modeNames[y],
          ((3 / 2) * x + 1) * buttonWidth,
          (2 * y + 1) * buttonHeight,
          buttonWidth,
          buttonHeight
        )
      );
    }
  }
}

function mouseClicked() {
  for (const chordButton of chordButtons) {
    if (chordButton.doesCollide(mouseX, mouseY)) {
      chordButton.setActive();
    } else {
      chordButton.setInactive();
    }
  }
}

function draw() {
  for (let y = 0; y < 3; y++) {
    text(
      modeNames[y],
      0,
      (2 * y + 1.3) * buttonHeight,
      buttonWidth,
      buttonHeight
    );
    if (y == 0) {
      for (let x = 0; x < 12; x++) {
        text(
          noteNames[x],
          ((3 / 2) * x + 1) * buttonWidth,
          buttonHeight / 2,
          buttonWidth,
          buttonHeight
        );
      }
    }
  }
  for (const chordButton of chordButtons) {
    chordButton.show();
  }
}
