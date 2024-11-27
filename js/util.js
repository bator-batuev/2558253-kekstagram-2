import { MAX_AVATAR, MIN_AVATAR, MESSAGES, NAMES } from './const.js';

// нахождение случайного числа из диапазона
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

// получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// функция получения комментария
let currentCommentId = 1;
const createComment = () => ({
  id: currentCommentId++,
  avatar: `img/avatar-${ getRandomPositiveInteger(MIN_AVATAR, MAX_AVATAR) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const isEscapeKey = (evt) => evt.key === 'Escape';

const numDecline = (num, nominative, genetiveSingular, genetivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genetivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genetiveSingular;
};

export {getRandomPositiveInteger, getRandomArrayElement, createComment, isEscapeKey, numDecline};
