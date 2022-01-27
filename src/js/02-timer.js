import '../sass/_timer.scss'
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  timerDiv: document.querySelector('div.timer'),
  calendar: document.querySelector('#date-selector'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const minDate = new Date();

    if (minDate > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', createTimer);

      function createTimer() {
        setInterval(() => {
          refs.startBtn.disabled = true;

          const currentDate = new Date();
          const timeRest = selectedDate - currentDate;
          const { days, hours, minutes, seconds } = convertMs(timeRest);

          refs.days.textContent = days;
          refs.hours.textContent = hours;
          refs.minutes.textContent = minutes;
          refs.seconds.textContent = seconds;
        }, 1000);
      }
    }
  },
};

flatpickr('input[type="text"]', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
