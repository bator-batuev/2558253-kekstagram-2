import { REMOVE_MESSAGE_TIMEOUT } from './const.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const numDecline = (num, nominative, genetiveSingular, genetivePlural) => {
  if (!Number.isFinite(num)) {
    throw new Error('Необходимо ввести число');
  }

  const absNum = Math.abs(num);
  if (absNum % 10 === 0 || absNum % 100 > 4 && absNum % 100 < 21) {
    return genetivePlural;
  }
  return absNum % 10 === 1
    ? nominative
    : genetiveSingular;
};

const errorLoadDataTemplate = document.querySelector('#data-error').content;
const body = document.body;

const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  body.append(errorArea);
  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { isEscapeKey, numDecline, showErrorMessage };
