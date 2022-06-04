// re-arranged version of noteNames
// arranged in this way to determine number after note
const semiTones = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

// constructs a chord by taking in a rootNoteName and a list of semitone differences
// returns a list of size (# ofsemitones + 1) with full note names
function constructChord(rootNoteName, intervals) {
  let rootNote = rootNoteName.slice(0, -1);
  let rootOctave = parseInt(rootNoteName.slice(-1));
  let rootNoteIndex = semiTones.indexOf(rootNote);
  const chord = [rootNoteName];

  for (const interval of intervals) {
    intervalIndex = rootNoteIndex + interval;
    intervalNote = semiTones[intervalIndex % 12];
    intervalOctave = rootOctave + parseInt(intervalIndex / 12);
    intervalNoteName = intervalNote + intervalOctave;
    chord.push(intervalNoteName);
  }
  return chord;
}

function constructChordFromQuality(rootNoteName, quality) {
  switch (quality) {
    case "Maj":
      return constructMajorTriad(rootNoteName);
    case "Min":
      return constructMinorTriad(rootNoteName);
    case "7th":
      return constructDominantTriad(rootNoteName);
  }
}

function constructMajorTriad(rootNoteName) {
  return constructChord(rootNoteName, [4, 7]);
}

function constructMinorTriad(rootNoteName) {
  return constructChord(rootNoteName, [3, 7]);
}

function constructDominantTriad(rootNoteName) {
  return constructChord(rootNoteName, [4, 7, 10]);
}

// accepts the rootNote with number signifying octave
// e.g. C4, E5
function altConstructMajorTriad(rootNoteName) {
  rootNote = rootNoteName.slice(0, -1);
  rootOctave = parseInt(rootNoteName.slice(-1));
  console.log(rootNote);

  // construct third by increasing over root 4 semitones
  // if there is a
  indexOfThird = semiTones.indexOf(rootNote) + 7;
  thirdNote = semiTones[indexOfThird % 12];
  thirdOctave = rootOctave + parseInt(indexOfThird / 12);
  thirdNoteName = thirdNote + thirdOctave;

  // construct fifth by increasing over root
  indexOfFifth = semiTones.indexOf(rootNote) + 4;
  fifthNote = semiTones[indexOfFifth % 12];
  fifthOctave = rootOctave + parseInt(indexOfFifth / 12);
  fifthNoteName = fifthNote + fifthOctave;

  return [rootNoteName, thirdNoteName, fifthNoteName];
}
