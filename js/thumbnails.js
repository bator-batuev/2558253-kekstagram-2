// импортируем объект с данными
import { similarObjects } from './data.js';
// записываем в переменную содержимое элемента шаблона миниатюр
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
// создаем контейнер для оптимизации обработки миниатюр
const container = document.createDocumentFragment();
// находим и записываем в переменную блок для вставки миниатюр
export const pictureBlock = document.querySelector('.pictures');
// перебираем объект с данными
similarObjects.forEach(({id, url, description, likes, comments}) => {
  // клонируем и записываем в переменную шаблон миниатюры со всеми потомками
  const thumbnail = thumbnailTemplate.cloneNode(true);
  // находим необходимые элементы один раз
  const imgElement = thumbnail.querySelector('.picture__img');
  const likesElement = thumbnail.querySelector('.picture__likes');
  const commentsElement = thumbnail.querySelector('.picture__comments');
  // заполняем шаблон данными из объекта
  thumbnail.dataset.pictureId = id;
  imgElement.src = url;
  imgElement.alt = description;
  likesElement.textContent = likes;
  commentsElement.textContent = comments.length;
  // вставляем шаблон в контейнер
  container.append(thumbnail);
});
// вставляем контейнер со всеми миниатюрами в отведенный
pictureBlock.append(container);

