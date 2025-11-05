const startBtn   = document.querySelector('.time__button');
const setupBlock = document.getElementById('setupBlock');
const timerBlock = document.getElementById('timerBlock');
const linia      = document.querySelector('.linia');
const timerText  = document.getElementById('timerText');

if (startBtn && setupBlock && timerBlock && linia && timerText) {
    startBtn.addEventListener('click', () => {
        const input = document.getElementById('timeInput');
        const value = input.value.trim();

        if (!value) {
            return;
        }

        setupBlock.classList.add('hidden');

        timerBlock.classList.remove('hidden');

        linia.classList.add('no-margin');

        timerText.textContent = value;
    });
}