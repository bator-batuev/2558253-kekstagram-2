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

// нахождение случайного числа из диапазона и проверка на уникальность
const generatedNumbers = [];
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  if (generatedNumbers.includes(result)) {
    return getRandomPositiveInteger(a,b);
  }
  generatedNumbers.push(result);
  return result;
};

//получение случайного числа без проверки на уникальность
const getAvatarIndex = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
  // получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getAvatarIndex(0, elements.length - 1)];

// функция получения комментария
const createComment = () => ({
  id: getRandomPositiveInteger(1, 1000),
  avatar: 'img/avatar-' + getAvatarIndex(MIN_AVATAR, MAX_AVATAR) + '.svg',
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// получаем сгенерированный объект
let currentId = 1;
const createObject = () => {
  const id = currentId;
  currentId++;
  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: getRandomArrayElement(DESCRIPTION),
    likes: getAvatarIndex(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getAvatarIndex(MIN_COMMENTS, MAX_COMMENTS)}, createComment),
  };
};

// мультиплицируем 25 раз
const similarObjects = Array.from({length: SIMILAR_OBJECTS_COUNT}, createObject);

// выводим итоговый массив
console.log(similarObjects);
