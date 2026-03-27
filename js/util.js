/**
 * Возвращает случайное целое число в заданном диапазоне включительно.
 *
 * @param {number} min - Минимальное значение диапазона (включительно)
 * @param {number} max - Максимальное значение диапазона (включительно)
 * @returns {number} Случайное целое число от min до max включительно
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Возвращает случайный элемент из массива
 *
 * @param {string[]} array - Массив, из которого выбирается элемент
 * @returns {string} Случайный элемент массива
 */
export const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

/**
 * Создает фабрику счетчиков, используя замыкание
 *
 * @param {number} [start=1] - Начальное значение счетчика
 * @returns {() => number} Функция-счетчик, увеличивающая значение на 1 при каждом вызове
 */
export const createCounter = (start = 1) => {
  let count = start;
  return () => count++;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const numDecline = (num, nominative, genetiveSingular, genetivePlural) => {
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
