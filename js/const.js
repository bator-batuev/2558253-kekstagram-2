const DESCRIPTION = [
  'Красивый закат на берегу моря',
  'Музей современного искусства',
  'Театр оперы и балета',
  'Центральная улица города',
  'Гроза в деревне'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Антон',
  'Александр',
  'Артур',
  'Зорик',
  'Влад',
  'Таня',
  'Батор'
];

// мин и макс значения id,лайков,аватаров и комментариев;количество объектов в итоговом массиве
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const SIMILAR_OBJECTS_COUNT = 25;

const SCALE_STEP = 0.25;

const MAX_COMMENT_LENGTH = 140;
const MAX_COMMENT_LENGTH_ERROR_MESSAGE = 'Превышено допустимое количество символов';

const getEffectSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat',
  };
  return selectors[currentInputId];
};

const sliderOptionsObjectChromeSepia = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
};

const sliderOptionsObjectMarvinDefault = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
};

const sliderOptionsObjectPhobos = {
  range: {
    min: 0,
    max: 3
  },
  start: 3,
  step: 0.1,
};

const sliderOptionsObjectHeat = {
  range: {
    min: 1,
    max: 3
  },
  start: 3,
  step: 0.1,
};

const Effects = {
  none: sliderOptionsObjectMarvinDefault,
  chrome: sliderOptionsObjectChromeSepia,
  sepia: sliderOptionsObjectChromeSepia,
  marvin: sliderOptionsObjectMarvinDefault,
  phobos: sliderOptionsObjectPhobos,
  heat: sliderOptionsObjectHeat,
};

const getChromeStyleFilter = (value) => `grayscale(${value})`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getMarvinStyleFilter = (value) => `invert(${value}%)`;
const getPhobosStyleFilter = (value) => `blur(${value}px)`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

const styleFilterByEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMarvinStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter
};

export {DESCRIPTION, MESSAGES, NAMES, MIN_LIKES, MAX_LIKES, MIN_AVATAR, MAX_AVATAR, MIN_COMMENTS, MAX_COMMENTS, SIMILAR_OBJECTS_COUNT, SCALE_STEP, MAX_COMMENT_LENGTH, MAX_COMMENT_LENGTH_ERROR_MESSAGE, getEffectSelector, styleFilterByEffects, Effects};
