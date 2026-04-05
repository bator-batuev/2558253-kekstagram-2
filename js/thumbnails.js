import { openPicture } from './open-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

export const renderThumbnails = (photos) => {
  const container = document.createDocumentFragment();

  const oldPictures = pictureBlock.querySelectorAll('.picture');

  oldPictures.forEach((picture) => picture.remove());

  photos.forEach((photo) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const imageElement = thumbnail.querySelector('.picture__img');
    const commentsElement = thumbnail.querySelector('.picture__comments');
    const likesElement = thumbnail.querySelector('.picture__likes');

    imageElement.src = photo.url;
    imageElement.alt = photo.description;
    commentsElement.textContent = photo.comments.length;
    likesElement.textContent = photo.likes;

    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();

      openPicture(photo);
    });

    container.append(thumbnail);
  });

  pictureBlock.append(container);
};
