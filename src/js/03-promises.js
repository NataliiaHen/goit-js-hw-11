
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  buttonSubmit: document.querySelector('button[type=submit]'),
};

function inputSubmitFn(event) {
  event.preventDefault();

  const values = {
    inputAmountValue: Number(refs.amount.value),
    inputDelayValue: Number(refs.delay.value),
    inputStepValue: Number(refs.step.value),
  };

  let count = 1;
  let delayVal = values.inputDelayValue;
let delayInterval


  

  const intervalId = setInterval(() => {
    if (count === values.inputAmountValue) {
      clearInterval(intervalId);
    }
    if (values.inputStepValue === 0) {
      createPromise(count, delayVal);
      count += 1;
      delay = 0;
    } else {
      createPromise(count, delayVal);
      count += 1;
      delayVal += values.inputStepValue;
      delay = delayVal;
    }
  }, delayInterval);
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve('Data passed into resolve function');
    } else {
      reject('Error passed into reject function');
    }
  });

  promise
    .then(result => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(error => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

refs.form.addEventListener('submit', inputSubmitFn);
