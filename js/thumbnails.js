import { openBigPicture } from './open-big-picture.js';
// записываем в переменную содержимое элемента шаблона миниатюр
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// находим и записываем в переменную блок для вставки миниатюр
export const pictureBlock = document.querySelector('.pictures');

export const renderThumbnails = (photos) => {
  const container = document.createDocumentFragment();

  // Очищаем старые превью
  const oldPictures = pictureBlock.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  // Создаем превью для каждой фотографии
  photos.forEach((photo) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);

    // Заполняем данными
    thumbnail.querySelector('.picture__img').src = photo.url;
    if (thumbnail.querySelector('.picture__img').src.endsWith('photos/3.jpg')) {
      const hashtags = '#fun #party #cool #young';
      thumbnail.querySelector('.picture__img').setAttribute('alt', hashtags); // Присваиваем атрибут alt элементу изображения
    }
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

    // Добавляем обработчик клика для каждой миниатюры
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      // Передаем данные фотографии напрямую в openBigPicture
      openBigPicture(photo);
    });

    container.append(thumbnail);
  });

  pictureBlock.append(container);
};
