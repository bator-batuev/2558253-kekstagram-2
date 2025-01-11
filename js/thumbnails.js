import {openBigPicture} from './open-big-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

const renderThumbnails = (photos) => {
  const container = document.createDocumentFragment();
  const oldPictures = pictureBlock.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());
  photos.forEach((photo) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const imgElement = thumbnail.querySelector('.picture__img');
    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });
    container.append(thumbnail);
  });
  pictureBlock.append(container);
};

export {pictureBlock, renderThumbnails};
