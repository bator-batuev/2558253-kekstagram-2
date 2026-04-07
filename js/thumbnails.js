import { openPicture } from './open-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

export const renderThumbnails = (photos) => {
  const container = document.createDocumentFragment();

  const oldPictures = pictureBlock.querySelectorAll('.picture');

  oldPictures.forEach((picture) => picture.remove());

  photos.forEach(({url, description, comments, likes}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const imageElement = thumbnail.querySelector('.picture__img');
    const commentsElement = thumbnail.querySelector('.picture__comments');
    const likesElement = thumbnail.querySelector('.picture__likes');

    imageElement.src = url;
    imageElement.alt = description;
    commentsElement.textContent = comments.length;
    likesElement.textContent = likes;

    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();

      openPicture({url, description, comments, likes});
    });

    container.append(thumbnail);
  });

  pictureBlock.append(container);
};
