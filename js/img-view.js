import { similarObjects } from './data.js';
import { pictureBlock } from './thumbnails.js';

// находим элемент для показа полноэкранного изображения
const bigPictureNode = document.querySelector('.big-picture');
// находим элемент для вставки изображения
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
// находим элемент для записи кол-ва лайков
const likesCountNode = bigPictureNode.querySelector('.likes-count');
// находим блок для вставки комментариев
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
// в нем находим первый элемент, который служит шаблоном для комментариев
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
// находим блок для вставки описания фотографий
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
// находим блок счетчика комментариев
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
// находим блок загрузки комментариев
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
// находим кнопку для закрытия окна просмотра
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

// функция закрытия окна просмотра
const closeBigPicture = () => {
  // добавляем элементу для показа полноэкранного изображения класс hidden
  bigPictureNode.classList.add('hidden');
  // удаляем класс modal-open, чтобы контейнер с фотографиями снова скроллился
  document.body.classList.remove('modal-open');
  // удаляем с кнопки для закрытия окна просмотра обработчик закрытия по клику на нее
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  // удаляем с документа обработчик закрытия окна просмотра по нажатию клавишы Esc
  document.removeEventListener('keydown', onEscKeydown);
};

// функция закрытия окна просмотра по клику
const onBigPictureCancelClick = () => {
  // вызываем функцию закрытия окна просмотра
  closeBigPicture();
};
// функция закрытия окна просмотра по нажатию клавишы Esc
const onEscKeydown = (evt) => {
  // проверяем, что нажата клавиша Esc
  if (evt.key === 'Escape') {
    // отменяем действие по умолчанию
    evt.preventDefault();
    // вызываем функцию закрытия окна просмотра
    closeBigPicture();
  }
};

// функция открытия полноэкранного изображения
const openBigPicture = (pictureId) => {
  // в массиве сгенерированных объектов находим фотографию с переданным в аргументе id (приводим к числу, если строка)
  const currentPhoto = similarObjects.find((photo) => photo.id === Number(pictureId));
  // создаем фрагмент для записи комментариев
  const socialCommentsFragment = document.createDocumentFragment();

  // в атрибут src элемента для вставки изображения записываем путь к нему
  bigPictureImgNode.src = currentPhoto.url;
  // в атрибут textContent элемента для записи кол-ва лайков записываем кол-во лайков
  likesCountNode.textContent = currentPhoto.likes;
  // очищаем содержимое блока комментариев, чтобы избежать их накопления при открытии других изображений
  socialCommentsNode.innerHTML = '';

  // создаем цикл, который пройдет по массиву с комментариями для текущего изображения
  currentPhoto.comments.forEach((comment) => {
    // клонируем шаблон для комментариев и записываем в переменную
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    // находим атрибут src и записываем в него путь к аватару пользователя
    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    // находим атрибут alt и записываем в него имя пользователя
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    // находим атрибут textContent и записываем в него текст комментария
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    // добавляем комментарий во фрагмент
    socialCommentsFragment.appendChild(socialCommentNode);
  });
  // в блок для вставки комментариев записываем содержимое фрагмента
  socialCommentsNode.appendChild(socialCommentsFragment);
  // в атрибут textContent блока для вставки описания записываем описание
  commentsCaptionNode.textContent = currentPhoto.description;
  // добавляем блоку счетчика комментариев класс hidden
  commentsCountNode.classList.add('hidden');
  // добавляем блоку загрузки комментариев класс hidden
  commentsLoaderNode.classList.add('hidden');

  // для элемента показа полноэкранного изображения убираем класс hiddden
  bigPictureNode.classList.remove('hidden');
  // вешаем обработчик событий на кнопку закрытия окна показа изображения по клику
  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);

  // добавляем тегу body класс modal-open, чтобы контейнер с фотографиями не прокручивался
  document.body.classList.add('modal-open');
  // вешаем обработчик событий на документ на закрытие окна показа изображения по нажатию клавиши Esc
  document.addEventListener('keydown', onEscKeydown);
};
// вешаем обработчик событий по клику на весь блок с миниатюрами
pictureBlock.addEventListener('click', (evt) => {
  const currentBigPicture = evt.target.closest('.picture');
  // проверяем, что кликнули по миниатюре
  if (currentBigPicture) {
    // аргументом передаем в функцию открытия полноэкранного изображения id изображения, по которому кликнули
    openBigPicture(currentBigPicture.dataset.pictureId);
  }
});
