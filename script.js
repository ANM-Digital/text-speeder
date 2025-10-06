const textInput = document.getElementById('textInput');
const wpmSlider = document.getElementById('wpmSlider');
const wpmInput = document.getElementById('wpmInput');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const startOverBtn = document.getElementById('startOverBtn');
const modeSelect = document.getElementById('modeSelect');
const flowScreen = document.getElementById('flowScreen');
const rsvpScreen = document.getElementById('rsvpScreen');
const rsvpWord = document.getElementById('rsvpWord');
const uploadBtn = document.getElementById('uploadBtn');
const loadBtn = document.getElementById('loadBtn');

let words = [];
let currentIndex = 0;
let interval;
let playing = false;

// Sync WPM inputs
wpmSlider.addEventListener('input', e => wpmInput.value = e.target.value);
wpmInput.addEventListener('input', e => wpmSlider.value = e.target.value);

// Upload text
uploadBtn.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.txt';
  fileInput.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => textInput.value = ev.target.result;
    reader.readAsText(file);
  };
  fileInput.click();
});

// Load example text
loadBtn.addEventListener('click', () => {
  textInput.value = "Welcome to Text Speeder! This is your example text. Adjust the speed and mode, then press Start.";
});

// Start reading
startBtn.addEventListener('click', () => {
  if (!textInput.value.trim()) return alert("Please enter or upload text first!");
  words = textInput.value.trim().split(/\s+/);
  currentIndex = 0;
  playing = true;
  showScreen(modeSelect.value);
  runReader();
});

// Pause
pauseBtn.addEventListener('click', () => playing = false);

// Restart
startOverBtn.addEventListener('click', () => {
  currentIndex = 0;
  playing = true;
  showScreen(modeSelect.value);
  runReader();
});

function showScreen(mode) {
  flowScreen.classList.remove('active');
  rsvpScreen.classList.remove('active');
  if (mode === 'flow') flowScreen.classList.add('active');
  else rsvpScreen.classList.add('active');
}

function runReader() {
  clearInterval(interval);
  const delay = 60000 / parseInt(wpmInput.value);
  interval = setInterval(() => {
    if (!playing || currentIndex >= words.length) {
      clearInterval(interval);
      playing = false;
      return;
    }

    const word = words[currentIndex++];
    if (modeSelect.value === 'flow') flowScreen.textContent += word + ' ';
    else rsvpWord.textContent = word;
  }, delay);
}

