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

export { isEscapeKey, numDecline };
