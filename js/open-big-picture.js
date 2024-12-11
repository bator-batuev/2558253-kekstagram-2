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

// Убираем массив photos и функцию savePhotos
export function openBigPicture(photo) { // Теперь принимаем объект фото напрямую
  // Используем photo напрямую без поиска
  bigPictureImgNode.src = photo.url;
  likesCountNode.textContent = photo.likes;
  commentsCaptionNode.textContent = photo.description;
  renderComments(photo.comments);

  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
}
