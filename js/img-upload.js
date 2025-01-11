import {isEscapeKey} from './util.js';
import {SCALE_STEP} from './const.js';
import {onEffectRadioBtnClick, resetFilter, imgPreview} from './effects-slider.js';
import {sendData} from './api.js';
import {pristine, addValidators} from './validation.js';
import {showErrorMessage, appendNotification} from './notification.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetBtn = document.querySelector('#upload-cancel');

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const effectsList = uploadForm.querySelector('.effects__list');
const effectsPreview = document.querySelectorAll('.effects__preview');

const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');

const formSubmitBtn = uploadForm.querySelector('.img-upload__submit');
const templateSucces = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];
let scale = 1;

const submitBtnText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

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

function closePhotoEditor () {
  hidePhotoEditor();
  removeModalOpenClass();
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();
  resetFilter();
  pristine.reset();
}

const resetScale = () => {
  scale = 1;
  imgPreview.style.transform = `scale(${scale})`;
  scaleControlValue.value = `${scale * 100}%`;
};

const sendFormData = async (formElement) => {
  const isValid = pristine.validate();
  if (isValid) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    disabledBtn(submitBtnText.SENDING);
    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSucces, () => closePhotoEditor(formElement)
      );
      const effectNoneInput = document.getElementById('effect-none');
      effectNoneInput.checked = true;
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

const setFilePreview = () => {
  const file = uploadFileControl.files[0];
  const url = URL.createObjectURL(file);
  imgPreview.src = url;
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${url})`;
  }
  );
};

const openUploadModal = () => {
  showPhotoEditor();
  addModalOpenClass();
  photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((item) => fileName.endsWith(item));
};

const isFileValid = () => {
  const file = uploadFileControl.files[0];
  return file && isValidType(file);
};

const onUploadFileControlChange = () => {
  if (isFileValid()) {
    resetScale();
    setFilePreview();
    openUploadModal();
    addValidators(hashtagInput, commentInput);
    return;
  }
  showErrorMessage('Неверный тип файла');
  uploadFileControl.value = '';
};

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', onUploadFileControlChange);
};

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

scaleControlSmaller.addEventListener('click', onSmallerBtnClick);
scaleControlBigger.addEventListener('click', onBiggerBtnClick);

export {uploadForm, initUploadModal};
