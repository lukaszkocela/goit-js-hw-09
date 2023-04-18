const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timer = null;

const getRandomHexColor = () =>
  (document.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`);

startButton.addEventListener('click', () => {
  timer = setInterval(getRandomHexColor, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener(`click`, () => {
  clearInterval(timer);
  startButton.disabled = false;
  stopButton.disabled = true;
});
