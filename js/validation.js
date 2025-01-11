import {MAX_COMMENT_LENGTH, MAX_COMMENT_LENGTH_ERROR_MESSAGE} from './const.js';
import {declineNumber} from './util.js';

const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const validateHashtag = (value) => {
  const inputText = value.toLowerCase().trim();
  if (!value) {
    return true;
  }

  const inputArrays = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArrays.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной решетки',
    },
    {
      check: inputArrays.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArrays.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа #',
    },
    {
      check: inputArrays.some((item, num, arrays) => arrays.includes(item, num + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: inputArrays.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_HASHTAG_SYMBOLS} символов, включая #`,
    },
    {
      check: inputArrays.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${declineNumber(MAX_HASHTAGS, 'хэштега', 'хэштегов', 'хэштегов')}`,
    },
    {
      check: inputArrays.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  for (const rule of rules) {
    if (rule.check) {
      return rule.error;
    }
  }
  return true;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const pristine = new Pristine(document.querySelector('.img-upload__form'), {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const addValidators = (hashtagInput, commentInput) => {
  pristine.addValidator(
    hashtagInput,
    (value) => validateHashtag(value) === true,
    validateHashtag
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    MAX_COMMENT_LENGTH_ERROR_MESSAGE
  );
};

export {pristine, addValidators};
