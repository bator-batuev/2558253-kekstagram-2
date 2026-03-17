import { createPhotos } from './data.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');
const pictures = createPhotos();

export const renderThumbnails = () => {
  const container = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');
    const comments = thumbnail.querySelector('.picture__comments');
    const likes = thumbnail.querySelector('.picture__likes');

    image.src = picture.url;
    image.alt = picture.description;
    comments.textContent = picture.comments.length;
    likes.textContent = picture.likes;

    container.append(thumbnail);
  });

  pictureBlock.append(container);
};
