import { getRandomPositiveInteger } from './util.js';
import { getRandomArrayElement } from './util.js';
import { createComment } from './util.js';
import { DESCRIPTION, Like, Comments, SIMILAR_OBJECTS_COUNT } from './const.js';

// получаем сгенерированный объект
let currentId = 1;
const createObject = () => {
  const id = currentId;
  currentId++;
  return {
    id: id,
    url: `photos/${ id }.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositiveInteger(Like.MIN, Like.MAX),
    comments: Array.from({length: getRandomPositiveInteger(Comments.MIN, Comments.MAX)}, createComment),
  };
};

// мультиплицируем 25 раз
export const similarObjects = Array.from({length: SIMILAR_OBJECTS_COUNT}, createObject);
