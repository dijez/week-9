const display = document.getElementById("display");
const powerSwitch = document.getElementById("power-switch");
const bankSwitch = document.getElementById("bank-switch");
const pads = document.querySelectorAll(".drum-pad");

let powerOn = false;
let bank = 1;

const bankOne = {
  Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
};

const bankTwo = {
  Q: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  W: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  E: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  A: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  S: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  D: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  Z: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  X: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  C: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
};

// Handle power switch
powerSwitch.addEventListener("change", () => {
  powerOn = powerSwitch.checked;
  display.textContent = powerOn ? "Power On" : "Power Off";
});

// Handle bank switch
bankSwitch.addEventListener("change", () => {
  if (!powerOn) return;
  bank = bankSwitch.checked ? 2 : 1;
  display.textContent = bank === 2 ? "Bank 2" : "Bank 1";
  updateAudioSources();
});

function updateAudioSources() {
  const sounds = bank === 1 ? bankOne : bankTwo;
  pads.forEach(pad => {
    const key = pad.id;
    const audio = pad.querySelector("audio");
    audio.src = sounds[key];
  });
}

// Handle pad click
pads.forEach(pad => {
  pad.addEventListener("click", () => playSound(pad.id));
});

document.addEventListener("keydown", e => {
  const key = e.key.toUpperCase();
  if (document.getElementById(key)) playSound(key);
});

function playSound(key) {
  if (!powerOn) return;
  const pad = document.getElementById(key);
  const audio = pad.querySelector("audio");
  audio.currentTime = 0;
  audio.play();
  display.textContent = `Playing ${key}`;
}
