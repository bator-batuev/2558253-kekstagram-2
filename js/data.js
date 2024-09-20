import { getRandomPositiveInteger } from './util.js';
import { getRandomArrayElement } from './util.js';
import { createComment } from './util.js';
import { DESCRIPTION, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, SIMILAR_OBJECTS_COUNT } from './const.js';

// получаем сгенерированный объект
let currentId = 1;
const createObject = () => {
  const id = currentId;
  currentId++;
  return {
    id: id,
    url: `photos/${ id }.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment),
  };
};

// мультиплицируем 25 раз
export const similarObjects = Array.from({length: SIMILAR_OBJECTS_COUNT}, createObject);

// выводим итоговый массив
console.log(similarObjects);
