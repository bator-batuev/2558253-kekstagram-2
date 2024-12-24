import { MAX_COMMENT_LENGTH, MAX_COMMENT_LENGTH_ERROR_MESSAGE } from './const.js';
import { numDecline } from './util.js';

const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const validateHashtag = (value) => {
  const inputText = value.toLowerCase().trim();

  if (!value) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_HASHTAG_SYMBOLS} символов, включая #`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(MAX_HASHTAGS, 'хэштега', 'хэштегов', 'хэштегов')}`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
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
  classTo: 'img-upload__form',
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

  commentInput.addEventListener('input', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export { pristine, addValidators };
