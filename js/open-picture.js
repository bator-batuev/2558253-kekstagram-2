import { renderComments, clearComments } from './render-comments.js';
import { isEscapeKey } from './util.js';

const pictureElement = document.querySelector('.big-picture');
const pictureImg = pictureElement.querySelector('.big-picture__img img');
const pictureLikes = pictureElement.querySelector('.likes-count');
const pictureCaption = pictureElement.querySelector('.social__caption');
const pictureCloseBtn = pictureElement.querySelector('.big-picture__cancel');

const onPictureCloseBtnClick = () => {
  closePicture();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closePicture();
  }
};

function closePicture () {
  clearComments();

  pictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pictureElement.removeEventListener('click', onPictureCloseBtnClick);
  document.removeEventListener('keydown', onEscKeydown);
}

export const openPicture = ({url, description, likes, comments}) => {
  clearComments();

  pictureImg.src = url;
  pictureLikes.textContent = likes;
  pictureCaption.textContent = description;

  renderComments(comments);

  document.body.classList.add('modal-open');
  pictureElement.classList.remove('hidden');

  document.addEventListener('keydown', onEscKeydown);
  pictureCloseBtn.addEventListener('click', onPictureCloseBtnClick);
};
