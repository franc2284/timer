const startBtn   = document.querySelector('.time__button');
const setupBlock = document.getElementById('setupBlock');
const timerBlock = document.getElementById('timerBlock');
const linia      = document.querySelector('.linia');
const timerText  = document.getElementById('timerText');
const progressCircle = document.querySelector('#timerBlock circle:nth-of-type(2)');

const pauseBtn   = document.querySelector('.btn__pausa');
const pauseImg   = pauseBtn ? pauseBtn.querySelector('img') : null;
const stopBtn    = document.querySelector('.btn__stop');
const plusMinuteBtn = document.querySelector('.btn__minute');

const PAUSE_ICON_SRC = 'images/ph_pause-fill.svg';
const PLAY_ICON_SRC  = 'images/Vector1.svg';

const radius = 90;
const circumference = 2 * Math.PI * radius;

if (progressCircle) {
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = 0;
}

let totalSeconds = 0;
let remainingSeconds = 0;
let timerId = null;
let isRunning = false;

function parseTime(value) {
  const match = value.match(/^(\d{1,2}):([0-5]\d)$/);
  if (!match) return null;
  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  return minutes * 60 + seconds;
}

function formatTime(total) {
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function updateView() {
  if (!timerText || !progressCircle || totalSeconds <= 0) return;

  timerText.textContent = formatTime(remainingSeconds);

  const passed   = totalSeconds - remainingSeconds;
  const progress = passed / totalSeconds;
  const offset   = circumference * progress;

  progressCircle.style.strokeDashoffset = offset;
}

function setPauseIcon(running) {
  if (!pauseImg) return;
  pauseImg.src = running ? PAUSE_ICON_SRC : PLAY_ICON_SRC;
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  isRunning = false;
  setPauseIcon(false);
}

function resetTimer() {
  stopTimer();

  totalSeconds = 0;
  remainingSeconds = 0;

  if (progressCircle) {
    progressCircle.style.strokeDashoffset = 0;
  }

  if (timerText) {
    timerText.textContent = '00:00';
  }

  if (timerBlock) timerBlock.classList.add('hidden');
  if (setupBlock) setupBlock.classList.remove('hidden');

  if (linia) linia.classList.remove('no-margin');

  if (pauseImg) {
    pauseImg.src = PAUSE_ICON_SRC;
  }
}

function startTimer() {
  if (isRunning || totalSeconds <= 0 || remainingSeconds <= 0) return;

  isRunning = true;
  setPauseIcon(true);

  timerId = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      updateView();
      stopTimer();
      return;
    }

    updateView();
  }, 1000);
}

if (startBtn && setupBlock && timerBlock && linia && timerText && progressCircle) {
  startBtn.addEventListener('click', () => {
    const input = document.getElementById('timeInput');
    const value = input.value.trim();
    if (!value) return;

    const seconds = parseTime(value);
    if (seconds === null || seconds <= 0) return;

    
    stopTimer();

    totalSeconds = seconds;
    remainingSeconds = seconds;

    setupBlock.classList.add('hidden');
    timerBlock.classList.remove('hidden');
    linia.classList.add('no-margin');

    updateView();
    startTimer();
  });
}

if (pauseBtn) {
  pauseBtn.addEventListener('click', () => {
    if (totalSeconds <= 0) return;

    if (isRunning) {
      
      stopTimer();
    } else {
      
      startTimer();
    }
  });
}

if (stopBtn) {
  stopBtn.addEventListener('click', () => {
    resetTimer();
  });
}


if (plusMinuteBtn) {
  plusMinuteBtn.addEventListener('click', () => {
    
    if (totalSeconds <= 0) return;

    totalSeconds     += 60;
    remainingSeconds += 60;

    updateView();
  });
}
