import { isEscapeKey } from './util.js';
import { imgPreview, onEffectChange, resetFilter } from './effects-slider.js';
import { createValidator } from './validation.js';
import { sendData } from './api.js';
import { appendNotification, showErrorMessage } from './notification.js';

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
const effectsPreview = document.querySelectorAll('.effects__preview');
const formSubmitBtn = uploadForm.querySelector('.img-upload__submit');
const templateSucces = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

const submitBtnText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const SCALE_STEP = 0.25;

const disableBtn = (text) => {
  formSubmitBtn.disabled = true;
  formSubmitBtn.textContent = text;
};

const enableBtn = (text) => {
  formSubmitBtn.disabled = false;
  formSubmitBtn.textContent = text;
};

const showPhotoEditor = () => {
  photoEditorForm.classList.remove('hidden');
};

const hidePhotoEditor = () => {
  photoEditorForm.classList.add('hidden');
};

const addModalOpenClass = () => {
  pageBody.classList.add('modal-open');
};

const removeModalOpenClass = () => {
  pageBody.classList.remove('modal-open');
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
  hidePhotoEditor();
  removeModalOpenClass();

  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);

  uploadForm.reset();
  resetFilter();

  imgPreview.style.transform = 'scale(1)';
  scale = 1;
  scaleControlValue.value = '100%';
  uploadFileControl.value = '';
}

const setFilePreview = () => {
  const file = uploadFileControl.files[0];
  const url = URL.createObjectURL(file);
  imgPreview.src = url;

  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${url})`;
  }
  );
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((item) => fileName.endsWith(item));
};

const isFileValid = () => {
  const file = uploadFileControl.files[0];

  return file && isValidType(file);
};

let validator;
const openUploadModal = () => {
  showPhotoEditor();
  addModalOpenClass();

  photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);

  validator = createValidator(uploadForm);
  validator.addValidators(hashtagInput, commentInput);
};

const onUploadFileControlChange = () => {
  if (isFileValid()) {
    setFilePreview();
    openUploadModal();

    return;
  }
  showErrorMessage('Неверный тип файла');

  uploadFileControl.value = '';
};

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', onUploadFileControlChange);
};

const sendFormData = async (formElement) => {
  const isValid = validator.validate();

  if (isValid) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');

    disableBtn(submitBtnText.SENDING);

    try {
      await sendData(new FormData(formElement));

      appendNotification(templateSucces, () => closePhotoEditor(formElement));
    } catch (error) {
      appendNotification(templateError);
    } finally {
      enableBtn(submitBtnText.IDLE);
    }
  }
};

function onFormSubmit (evt) {
  evt.preventDefault();

  sendFormData(evt.target);
}
