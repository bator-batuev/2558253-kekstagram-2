import {clearComments, renderComments, bigPictureNode} from './render-comments.js';

const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  clearComments();
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
};

function onBigPictureCancelClick () {
  closeBigPicture();
}

function onEscKeydown (evt) {
  if (evt.key !== 'Escape') {
    return;
  }
  evt.preventDefault();
  closeBigPicture();
}

const openBigPicture = (photo) => {
  bigPictureImgNode.src = photo.url;
  likesCountNode.textContent = photo.likes;
  commentsCaptionNode.textContent = photo.description;
  renderComments(photo.comments);

  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
};

export {openBigPicture};
