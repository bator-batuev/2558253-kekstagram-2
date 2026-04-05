import { isEscapeKey } from './util.js';
import { imgPreview, onEffectChange, resetFilter } from './effects-slider.js';
import { createValidator } from './validation.js';
import { sendData } from './api.js';
import { appendNotification } from './notification.js';

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
const formSubmitBtn = uploadForm.querySelector('.img-upload__submit');
const templateSucces = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const submitBtnText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const SCALE_STEP = 0.25;

const disabledBtn = (text) => {
  formSubmitBtn.disabled = true;
  formSubmitBtn.textContent = text;
};

const enabledBtn = (text) => {
  formSubmitBtn.disabled = false;
  formSubmitBtn.textContent = text;
};

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

zoomOutBtn.addEventListener('click', onZoomOutBtnClick);
zoomInBtn.addEventListener('click', onZoomInBtnClick);
effectsList.addEventListener('change', onEffectChange);

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);

  uploadForm.reset();
  resetFilter();
  imgPreview.style.transform = 'scale(1)';
  scale = 1;
  scaleControlValue.value = '100%';
  uploadFileControl.value = '';
}

export const initUploadModal = () => {
  const validator = createValidator(uploadForm);

  validator.addValidators(hashtagInput, commentInput);

  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    uploadForm.addEventListener('submit', onFormSubmit);
  });

  const sendFormData = async (formElement) => {
    const isValid = validator.validate();

    if (isValid) {
      hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');

      disabledBtn(submitBtnText.SENDING);

      try {
        await sendData(new FormData(formElement));

        appendNotification(templateSucces, () => closePhotoEditor(formElement));
      } catch (error) {
        appendNotification(templateError);
      } finally {
        enabledBtn(submitBtnText.IDLE);
      }
    }
  };

  function onFormSubmit (evt) {
    evt.preventDefault();

    sendFormData(evt.target);
  }
};
