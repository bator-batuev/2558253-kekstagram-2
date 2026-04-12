import { isEscapeKey } from './util';

const REMOVE_MESSAGE_TIMEOUT = 5000;

const body = document.body;

const onNotificationCloseClick = (evt) => {
  evt.stopPropagation();

  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeBtn = existElement?.querySelector('button');

  if (evt.target === existElement || evt.target === closeBtn) {
    closeNotification();
  }
};

const onNotificationCloseKeydown = (evt) => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');

  if (existElement && isEscapeKey(evt)) {
    evt.stopPropagation();

    closeNotification();
  }
};

function closeNotification () {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  if (!existElement) {
    return;
  }

  existElement.remove();

  body.removeEventListener('click', onNotificationCloseClick);
  body.removeEventListener('keydown', onNotificationCloseKeydown);
}

export const appendNotification = (template, trigger = null) => {
  trigger?.();

  const notificationNode = template.cloneNode(true);

  body.append(notificationNode);

  body.addEventListener('click', onNotificationCloseClick);
  body.addEventListener('keydown', onNotificationCloseKeydown);
};

const errorLoadDataTemplate = document.querySelector('#data-error').content;

export const showErrorMessage = (message) => {
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
