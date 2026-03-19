import { createPhotos } from './data.js';
import { openPicture } from './open-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');
export const pictures = createPhotos();

export const renderThumbnails = () => {
  const container = document.createDocumentFragment();

  pictures.forEach(({id, url, description, likes, comments}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const imageElement = thumbnail.querySelector('.picture__img');
    const commentsElement = thumbnail.querySelector('.picture__comments');
    const likesElement = thumbnail.querySelector('.picture__likes');

    thumbnail.dataset.pictureId = id;
    imageElement.src = url;
    imageElement.alt = description;
    commentsElement.textContent = comments.length;
    likesElement.textContent = likes;

    container.append(thumbnail);
  });

  pictureBlock.append(container);
};

pictureBlock.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    openPicture(currentPicture.dataset.pictureId);
  }
});
