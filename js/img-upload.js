import { isEscapeKey } from './util.js';
import { SCALE_STEP } from './const.js';
import { onEffectRadioBtnClick, resetFilter, imgPreview} from './effects-slider.js';
import { sendData } from './api.js';
import { createValidator } from './validation.js';
import { showErrorMessage } from './notification.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetBtn = document.querySelector('#upload-cancel');

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const effectsList = uploadForm.querySelector('.effects__list');
const effectsPreview = document.querySelectorAll('.effects__preview');

const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');

const formSubmitBtn = uploadForm.querySelector('.img-upload__submit');
const templateSucces = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const FILE_TYPE = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

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

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeBtn = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeBtn || isEscapeKey(evt)) {
    existElement.remove();
    pageBody.removeEventListener('click', closeNotification);
    pageBody.removeEventListener('keydown', closeNotification);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  pageBody.append(notificationNode);
  pageBody.addEventListener('click', closeNotification);
  pageBody.addEventListener('keydown', closeNotification);
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

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

const initUploadModal = () => {
  const validator = createValidator(uploadForm);
  validator.addValidators(hashtagInput, commentInput);

  uploadFileControl.addEventListener('change', () => {
    const file = uploadFileControl.files[0];
    const fileName = file.name.toLowerCase();
    const fileExt = fileName.split('.').pop();
    const matches = FILE_TYPE.includes(fileExt);
    if (matches) {
      const url = URL.createObjectURL(file);
      imgPreview.src = url;
      effectsPreview.forEach((item) => {
        item.style.backgroundImage = `url(${url})`;
      });
    } else {
      showErrorMessage('Неверный тип файла');
      uploadFileControl.value = '';
      return;
    }
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

export { uploadForm, initUploadModal };
