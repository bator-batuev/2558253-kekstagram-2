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

const DEBOUNCE_DELAY = 500;

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, numDecline, debounce };
