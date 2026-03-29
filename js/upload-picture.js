import { isEscapeKey } from './util.js';
import { isHashtagValid } from './validate-hashtag.js';
import { imgPreview, onEffectChange } from './effects-slider.js';

const pageBody = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetBtn = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const zoomOutBtn = uploadForm.querySelector('.scale__control--smaller');
const zoomInBtn = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const effectsList = uploadForm.querySelector('.effects__list');

const MAX_COMMENT_LENGTH = 140;
const MAX_COMMENT_LENGTH_ERROR_MESSAGE = 'Превышено допустимое количество символов';
const SCALE_STEP = 0.25;

function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(commentInput, validateComment, MAX_COMMENT_LENGTH_ERROR_MESSAGE);
pristine.addValidator(hashtagInput, (value) => isHashtagValid(value) === true, isHashtagValid);

const onPhotoEditorResetBtnClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closePhotoEditor();
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
};

let scale = 1;
const onZoomOutBtnClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControlValue.value = `${scale * 100}%`;
  }
};

const onZoomInBtnClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControlValue.value = `${scale * 100}%`;
  }
};

commentInput.addEventListener('input', () => {
  pristine.validate();
});
zoomOutBtn.addEventListener('click', onZoomOutBtnClick);
zoomInBtn.addEventListener('click', onZoomInBtnClick);
effectsList.addEventListener('change', onEffectChange);

function closePhotoEditor() {
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
