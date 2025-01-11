import {isEscapeKey} from './util.js';

const REMOVE_MESSAGE_TIMEOUT = 5000;

const body = document.body;

const onNotificationCloseClick = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeBtn = existElement.querySelector('button');

  if (evt.target === existElement || evt.target === closeBtn) {
    existElement.remove();
    body.removeEventListener('click', onNotificationCloseClick);
    body.removeEventListener('keydown', onNotificationCloseKeydown);
  }
};

function onNotificationCloseKeydown (evt) {
  const existElement = document.querySelector('.success') || document.querySelector('.error');

  if (isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', onNotificationCloseClick);
    body.removeEventListener('keydown', onNotificationCloseKeydown);
  }
}

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onNotificationCloseClick);
  body.addEventListener('keydown', onNotificationCloseKeydown);
};

const errorLoadDataTemplate = document.querySelector('#data-error').content;

const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  body.append(errorArea);
  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export {appendNotification, showErrorMessage};
