// импортируем объект с данными
import { similarObjects } from './data.js';
// записываем в переменную содержимое элемента шаблона миниатюр
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
// создаем контейнер для оптимизации обработки миниатюр
const container = document.createDocumentFragment();
// находим и записываем в переменную блок для вставки миниатюр
const pictureBlock = document.querySelector('.pictures');
// перебираем объект с данными
similarObjects.forEach((photo) => {
  // клонируем и записываем в переменную шаблон миниатюры со всеми потомками
  const thumbnail = thumbnailTemplate.cloneNode(true);
  // зпролняем шаблон данными из объекта
  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__img').alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  // вставляем шаблон в контейнер
  container.append(thumbnail);
});
// вставляем контейнер со всеми миниатюрами в отведенный для них блок
pictureBlock.append(container);

