document.addEventListener('DOMContentLoaded', () => {
  const timeElement = document.querySelector('.vrema');
  const dateElement = document.querySelector('.data p');
  if (!timeElement || !dateElement) return;

  const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ];

  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];

  function updateTimeAndDate() {
    const now = new Date();

    const hours   = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;

    const dayName   = days[now.getDay()];
    const day       = now.getDate();
    const monthName = months[now.getMonth()];
    const year      = now.getFullYear();

    const offsetMinutes = -now.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);

    const tzString = `GMT${sign}${offsetHours}`;

    dateElement.textContent = `${dayName}, ${day} ${monthName} ${year} г. (${tzString})`;
  }

  updateTimeAndDate();

  setInterval(updateTimeAndDate, 60 * 1000);
});
