const startBtn   = document.querySelector('.time__button');
const setupBlock = document.getElementById('setupBlock');
const timerBlock = document.getElementById('timerBlock');
const linia      = document.querySelector('.linia');
const timerText  = document.getElementById('timerText');
const progressCircle = document.querySelector('#timerBlock circle:nth-of-type(2)'); // вторая окружность — фиолетовая

let countdownId = null;

function parseTime(value) {
  const match = value.match(/^(\d{1,2}):([0-5]\d)$/); // mm:ss
  if (!match) return null;
  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  return minutes * 60 + seconds;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

if (startBtn && setupBlock && timerBlock && linia && timerText && progressCircle) {
  startBtn.addEventListener('click', () => {
    const input = document.getElementById('timeInput');
    const value = input.value.trim();

    if (!value) return;

    const totalSeconds = parseTime(value);
    if (totalSeconds === null || totalSeconds <= 0) return;

    setupBlock.classList.add('hidden');
    timerBlock.classList.remove('hidden');
    linia.classList.add('no-margin');

    if (countdownId !== null) {
      clearInterval(countdownId);
      countdownId = null;
    }

    let remaining = totalSeconds;
    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    // Устанавливаем длину окружности
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = 0;

    timerText.textContent = formatTime(remaining);

    const startTime = Date.now(); // момент начала

    // таймер обновления каждую секунду
    countdownId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      remaining = totalSeconds - elapsed;

      if (remaining <= 0) {
        timerText.textContent = '00:00';
        clearInterval(countdownId);
        progressCircle.style.strokeDashoffset = circumference; // полностью заполнено
        return;
      }

      timerText.textContent = formatTime(remaining);

      // вычисляем процент прошедшего времени
      const progress = elapsed / totalSeconds;
      const offset = circumference * progress;
      progressCircle.style.strokeDashoffset = offset;
    }, 1000);
  });
}
