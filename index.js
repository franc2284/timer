const startBtn   = document.querySelector('.time__button');
const setupBlock = document.getElementById('setupBlock');
const timerBlock = document.getElementById('timerBlock');
const linia      = document.querySelector('.linia');
const timerText  = document.getElementById('timerText');

let countdownId = null;

function parseTime(value) {
  const match = value.match(/^(\d{1,2}):([0-5]\d)$/); 
  if (!match) return null;

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);

  return minutes * 60 + seconds;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${mm}:${ss}`;
}

if (startBtn && setupBlock && timerBlock && linia && timerText) {
  startBtn.addEventListener('click', () => {
    const input = document.getElementById('timeInput');
    const value = input.value.trim();

    if (!value) return;

    const totalSeconds = parseTime(value);
    if (totalSeconds === null || totalSeconds <= 0) {
      return;
    }

    setupBlock.classList.add('hidden');
    timerBlock.classList.remove('hidden');
    linia.classList.add('no-margin');

    if (countdownId !== null) {
      clearInterval(countdownId);
      countdownId = null;
    }

    let remaining = totalSeconds;

    timerText.textContent = formatTime(remaining);

    countdownId = setInterval(() => {
      remaining -= 1;

      if (remaining <= 0) {
        timerText.textContent = '00:00';
        clearInterval(countdownId);
        countdownId = null;
        return;
      }

      timerText.textContent = formatTime(remaining);
    }, 1000);
  });
}
