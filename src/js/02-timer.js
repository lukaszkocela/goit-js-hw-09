import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.getElementById(`datetime-picker`);
const startButton = document.querySelector(`[data-start]`);
const daysData = document.querySelector(`[data-days]`);
const hoursData = document.querySelector(`[data-hours]`);
const minutesData = document.querySelector(`[data-minutes]`);
const secondsData = document.querySelector(`[data-seconds]`);
let timer = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const today = new Date();
    if (selectedDate < today) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 5000,
        position: 'center-top',
        clickToClose: true,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr(datePicker, options);

const displayCountdown = value => {
  clearInterval(timer);
  const selectedDate = value;
  timer = setInterval(() => {
    const today = new Date();
    const remainingTime = selectedDate - today;
    if (remainingTime < 0) {
      clearInterval(timer);
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      daysData.textContent = addLeadingZero(days);
      hoursData.textContent = addLeadingZero(hours);
      minutesData.textContent = addLeadingZero(minutes);
      secondsData.textContent = addLeadingZero(seconds);
    }
  }, 1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return value.toString().padStart(2, `0`);
};

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const selectedDate = new Date(datePicker.value);
  displayCountdown(selectedDate);
});
