import { pictures } from './thumbnails.js';
import { isEscapeKey } from './util.js';

const pictureElement = document.querySelector('.big-picture');
const pictureImg = pictureElement.querySelector('.big-picture__img img');
const pictureLikes = pictureElement.querySelector('.likes-count');
const commentsElement = pictureElement.querySelector('.social__comments');
const commentTemplate = commentsElement.querySelector('.social__comment');
const pictureCaption = pictureElement.querySelector('.social__caption');
const commentsCounter = pictureElement.querySelector('.social__comment-count');
const commentsLoader = pictureElement.querySelector('.social__comments-loader');
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
  pictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureElement.removeEventListener('click', onPictureCloseBtnClick);
  document.removeEventListener('keydown', onEscKeydown);
}

export const openPicture = (pictureId) => {
  const currentPicture = pictures.find((picture) => picture.id === Number(pictureId));
  const {url, description, likes, comments} = currentPicture;
  const commentsFragment = document.createDocumentFragment();

  pictureImg.src = url;
  pictureLikes.textContent = likes;
  commentsElement.innerHTML = '';
  pictureCaption.textContent = description;

  comments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsFragment.appendChild(commentElement);
  });

  commentsElement.append(commentsFragment);

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  pictureElement.classList.remove('hidden');

  pictureCloseBtn.addEventListener('click', onPictureCloseBtnClick);

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};
