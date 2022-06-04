// CONSTANTS
let buttonWidth, buttonHeight, polySynth, currentlyPlaying;
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

const releaseQueue = [];

const colorValues = [
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#80ff00",
  "#00ff00",
  "#00ff80",
  "#00ffff",
  "#0080ff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
  "#ff0080",
];

const modeNames = ["Maj", "Min", "7th"];

function setup() {
  // INITIALIZING CONSTANTS
  buttonWidth = (windowWidth * 2) / 39;
  buttonHeight = windowHeight / 7;
  currentlyPlaying = null;
  polySynth = new p5.PolySynth();

  // SETUP
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, TOP);
  textSize(windowWidth / 85);
  background(0);
  getAudioContext().suspend();

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 12; x++) {
      chordButtons.push(
        new Chord(
          noteNames[x],
          modeNames[y],
          colorValues[x],
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
  if (getAudioContext().state == "suspended") {
    userStartAudio();
  }
  // collision detection for buttons
  collidedFlag = false;

  // no matter what, we can stop the currentlyPlaying chord
  if (currentlyPlaying != null) {
    // stop playing previous chord
    console.log("stopping currentlyPlaying");
    for (const note of currentlyPlaying.notes) {
      console.log("stopping", note);
      queueRelease(note);
      // polySynth.noteRelease(note);
    }
  }

  for (const chordButton of chordButtons) {
    if (chordButton.doesCollide(mouseX, mouseY)) {
      collidedFlag = true;
      chordButton.toggleActive();
      if (chordButton.isActive) {
        // chord just turned active. Start note

        // update currentlyPlaying
        currentlyPlaying = {
          notes: chordButton.getChord(),
        };

        // starting sustain
        for (const note of chordButton.getChord()) {
          queueBegin(note);
          console.log("starting ", note);
        }
      } else {
        // toggling on currently playing note to stop the note

        // turn currentlyPlaying to nothing
        currentlyPlaying = null;

        // release current chord
        for (const note of chordButton.getChord()) {
          polySynth.noteRelease(note);
          console.log("stopping ", note);
        }
      }
    } else {
      // don't do any sound update logic
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

function queueRelease(note) {
  setTimeout(() => {
    polySynth.noteRelease(note);
  }, 10);
}

function queueBegin(note) {
  setTimeout(() => {
    polySynth.noteAttack(note);
  }, 60);
}
