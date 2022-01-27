import '../sass/_color-switch.scss';

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  const newColor = getRandomHexColor();
  body.style.backgroundColor = newColor;
}

let intervald;

function setIntervalChangeBg() {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervald = setInterval(changeBgColor, 1000);
}

function stopIntervalChangeBg() {
  stopButton.disabled = true;
  startButton.disabled = false;

  clearInterval(intervald);
}

startButton.addEventListener('click', setIntervalChangeBg);
stopButton.addEventListener('click', stopIntervalChangeBg);
