import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delayData = parseInt(
    document.querySelector('input[name="delay"]').value
  );
  const stepData = parseInt(document.querySelector('input[name="step"]').value);
  const amountData = parseInt(
    document.querySelector('input[name="amount"]').value
  );

  for (let i = 0; i < amountData; i++) {
    createPromise(i + 1, delayData + i * stepData)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});
