import { photos } from './data.js';
import { clearComments, renderComments, bigPictureNode } from './render-comments.js';

// находим элемент для вставки изображения
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
// находим элемент для записи кол-ва лайков
const likesCountNode = bigPictureNode.querySelector('.likes-count');
// находим блок для вставки описания фотографий
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
// находим кнопку для закрытия окна просмотра
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

// функция закрытия окна просмотра
function closeBigPicture () {
  // функция очистки комментариев
  clearComments();
  // добавляем элементу для показа полноэкранного изображения класс hidden
  bigPictureNode.classList.add('hidden');
  // удаляем класс modal-open, чтобы контейнер с фотографиями снова скроллился
  document.body.classList.remove('modal-open');
  // удаляем с кнопки для закрытия окна просмотра обработчик закрытия по клику на нее
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  // удаляем с документа обработчик закрытия окна просмотра по нажатию клавишы Esc
  document.removeEventListener('keydown', onEscKeydown);
}

// функция закрытия окна просмотра по клику
function onBigPictureCancelClick () {
  // вызываем функцию закрытия окна просмотра
  closeBigPicture();
}
// функция закрытия окна просмотра по нажатию клавишы Esc
function onEscKeydown (evt) {
  // проверяем, что нажата не клавиша Esc, выходим из функции
  if (evt.key !== 'Escape') {
    return;
  }
  // отменяем действие по умолчанию
  evt.preventDefault();
  // вызываем функцию закрытия окна просмотра
  closeBigPicture();
}

// функция открытия полноэкранного изображения
export function openBigPicture (pictureId) {
  // в массиве сгенерированных объектов находим фотографию с переданным в аргументе id (приводим к числу, если строка)
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  // в атрибут src элемента для вставки изображения записываем путь к нему
  bigPictureImgNode.src = currentPhoto.url;
  // в атрибут textContent элемента для записи кол-ва лайков записываем кол-во лайков
  likesCountNode.textContent = currentPhoto.likes;
  // в атрибут textContent блока для вставки описания записываем описание
  commentsCaptionNode.textContent = currentPhoto.description;
  //функция генерации комментариев
  renderComments(currentPhoto.comments);
  // для элемента показа полноэкранного изображения убираем класс hiddden
  bigPictureNode.classList.remove('hidden');
  // добавляем тегу body класс modal-open, чтобы контейнер с фотографиями не прокручивался
  document.body.classList.add('modal-open');
  // вешаем обработчик событий на кнопку закрытия окна показа изображения по клику
  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  // вешаем обработчик событий на документ на закрытие окна показа изображения по нажатию клавиши Esc
  document.addEventListener('keydown', onEscKeydown);
}
