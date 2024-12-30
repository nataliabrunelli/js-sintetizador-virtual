const pianoKeys = document.querySelectorAll(".keys");

const onda = document.getElementById("onda");

const volumeSlider = document.getElementById("volume");

const keysToggle = document.getElementById("teclas");

const keyToFrequency = {
  a: 261.63,
  w: 277.18,
  s: 293.66,
  e: 311.13,
  d: 329.63,
  f: 349.23,
  t: 369.99,
  g: 392.0,
  y: 415.3,
  h: 440.0,
  u: 466.16,
  j: 493.88,
  k: 523.25,
  o: 554.37,
  l: 587.33,
  p: 622.25,
  ç: 659.25,
};
//Precisa mapear o valor da tecla para a frequência que está usando na API!

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//Acessa a Web Audio API nativa do navegador

function playTone(key) {
  const oscillator = audioContext.createOscillator();

  oscillator.type = onda.value; // Tipo do som: sine, square, sawtooth, triangle
  oscillator.frequency.value = key; // Frequência em Hz
  oscillator.connect(gainNode); //O gainNode faz a ponte com o audioDestination
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5); // Duração: 0.5 segundos

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  if (clickedKey) {
    clickedKey.classList.add("active");
    setTimeout(() => {
      clickedKey.classList.remove("active");
    }, 150);
  }
}

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => {
    const frequency = parseFloat(key.dataset.key);
    if (frequency) {
      playTone(frequency);
    }
  });
});

document.addEventListener("keydown", (e) => {
  const frequency = keyToFrequency[e.key];
  if (frequency) {
    playTone(frequency);
  }
});

// Criação do GainNode para controle de volume
const gainNode = audioContext.createGain();
gainNode.gain.value = parseFloat(volumeSlider.value); // Volume inicial
gainNode.connect(audioContext.destination); // Conectado à saída de áudio

volumeSlider.addEventListener("input", (e) => {
  gainNode.gain.value = parseFloat(e.target.value); // Ajusta o volume
});

keysToggle.addEventListener("click", () => {
  pianoKeys.forEach((key) => {
    key.classList.toggle("hide");
  });
});
