// мин и макс значения id,лайков,аватаров и комментариев;количество объектов в итоговом массиве
const Like = {
  MIN: 15,
  MAX: 200
};

const Avatar = {
  MIN: 1,
  MAX: 6
};
const Comments = {
  MIN: 0,
  MAX: 30
};

const SIMILAR_OBJECTS_COUNT = 25;

const SCALE_STEP = 0.25;

const MAX_COMMENT_LENGTH = 140;
const MAX_COMMENT_LENGTH_ERROR_MESSAGE = 'Превышено допустимое количество символов';

const EffectSelector = {
  'effect-none': 'effects__preview--none',
  'effect-chrome': 'effects__preview--chrome',
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat',
};

const getEffectSelector = (currentInputId) => EffectSelector[currentInputId];

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

const StyleFilter = {
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`,
};

const styleFilterByEffect = {
  chrome: StyleFilter.chrome,
  sepia: StyleFilter.sepia,
  marvin: StyleFilter.marvin,
  phobos: StyleFilter.phobos,
  heat: StyleFilter.heat
};

const SubmitBtnText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

export { Like, Avatar, Comments, SIMILAR_OBJECTS_COUNT, SCALE_STEP, MAX_COMMENT_LENGTH, MAX_COMMENT_LENGTH_ERROR_MESSAGE, getEffectSelector, styleFilterByEffect, Effects, SubmitBtnText };
