const pads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');
const powerSwitch = document.getElementById('power');
const bankSwitch = document.getElementById('bank');
const volumeControl = document.getElementById('volume');

let powerOn = true;
let currentBank = 1;
let volume = parseFloat(volumeControl.value);

// Define 2 sets of sounds (Bank 1 & Bank 2)
const bank1 = {
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

const bank2 = {
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

// Load selected bank
function loadBank(bank) {
  pads.forEach(pad => {
    const key = pad.dataset.key;
    const audio = document.getElementById(`audio-${key}`);
    audio.src = bank[key];
  });
}

// Play sound
function playSound(key) {
  if (!powerOn) return;
  const audio = document.getElementById(`audio-${key}`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
  display.textContent = `Sound: ${key}`;
  const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
  pad.classList.add('active');
  setTimeout(() => pad.classList.remove('active'), 150);
}

// Event listeners
pads.forEach(pad => pad.addEventListener('click', () => playSound(pad.dataset.key)));

document.addEventListener('keydown', e => {
  const key = e.key.toUpperCase();
  if (bank1[key]) playSound(key);
});

powerSwitch.addEventListener('click', () => {
  powerOn = !powerOn;
  powerSwitch.classList.toggle('active', powerOn);
  display.textContent = powerOn ? 'Power ON' : 'Power OFF';
});

bankSwitch.addEventListener('click', () => {
  currentBank = currentBank === 1 ? 2 : 1;
  bankSwitch.classList.toggle('active', currentBank === 2);
  loadBank(currentBank === 1 ? bank1 : bank2);
  display.textContent = `Bank ${currentBank}`;
});

volumeControl.addEventListener('input', e => {
  volume = parseFloat(e.target.value);
  display.textContent = `Volume: ${Math.round(volume * 100)}%`;
});

// Default load
loadBank(bank1);
