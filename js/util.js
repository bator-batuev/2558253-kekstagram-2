import { MAX_AVATAR, MIN_AVATAR, MESSAGES, NAMES } from './const.js';

// нахождение случайного числа из диапазона
export const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

// получение случайного элемента массива
export const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// функция получения комментария
let currentCommentId = 1;
export const createComment = () => ({
  id: currentCommentId++,
  avatar: `img/avatar-${ getRandomPositiveInteger(MIN_AVATAR, MAX_AVATAR) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});
