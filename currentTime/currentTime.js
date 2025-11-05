document.addEventListener('DOMContentLoaded', () => {
  const timeElement = document.querySelector('.vrema');
  if (!timeElement) return;

  function updateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    timeElement.textContent = `${hours}:${minutes}`;
  }

  updateTime();

  setInterval(updateTime, 60 * 1000);
});
