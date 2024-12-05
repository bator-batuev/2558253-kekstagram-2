import { isEscapeKey } from './util.js';
import { isHashtagValid } from './is-hashtag-valid.js';
import { MAX_COMMENT_LENGTH, MAX_COMMENT_LENGTH_ERROR_MESSAGE, SCALE_STEP } from './const.js';
import { onEffectRadioBtnClick, resetFilter, imgPreview} from './effects-slider.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetBtn = document.querySelector('#upload-cancel');

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const effectsList = uploadForm.querySelector('.effects__list');

const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');

const onPhotoEditorResetBtnClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    uploadForm.addEventListener('submit', onFormSubmit);
  });
};

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__form',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagInput, (value) => isHashtagValid(value) === true, isHashtagValid);

function validateComment (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(commentInput, validateComment, MAX_COMMENT_LENGTH_ERROR_MESSAGE);
commentInput.addEventListener('input', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

function onFormSubmit (evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
}

let scale = 1;
const onSmallerBtnClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControlValue.value = `${scale * 100}%`;
  }
};

const onBiggerBtnClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControlValue.value = `${scale * 100}%`;
  }
};

effectsList.addEventListener('change', (evt) => {
  resetFilter();
  onEffectRadioBtnClick(evt);
});

smaller.addEventListener('click', onSmallerBtnClick);
bigger.addEventListener('click', onBiggerBtnClick);
