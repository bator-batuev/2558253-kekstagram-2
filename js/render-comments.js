const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

// находим элемент для показа полноэкранного изображения
const bigPictureNode = document.querySelector('.big-picture');
// находим блок для вставки комментариев
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
// в нем находим первый элемент, который служит шаблоном для комментариев
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
// находим блок счетчика комментариев
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
// находим кнопку загрузки комментариев
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
// очищаем содержимое блока комментариев, чтобы избежать их накопления при открытии других изображений
socialCommentsNode.innerHTML = '';
// функция генерации блока комментариев
const renderNextComments = () => {
  // создаем фрагмент для записи комментариев
  const socialCommentsFragment = document.createDocumentFragment();
  // извлекаем подмассив комментариев в указанном диапазоне
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  // вычисляем сколько комментариев будут отображены
  const renderCommentsLength = renderedComments.length + currentCount;
  // проходим по подмассиву с комментариями
  renderedComments.forEach((comment) => {
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
  // записываем число отображенных комментариев в счетчик
  commentsCountNode.firstChild.textContent = `${renderCommentsLength}`;
  // записываем общее количество комментариев
  commentsCountNode.querySelector('.social__comment-total-count').textContent = comments.length;
  // если число отображенных комментариев больше или равно общему количеству, то...
  if (renderCommentsLength >= comments.length) {
    // добавляем блоку загрузки комментариев класс hidden
    commentsLoaderNode.classList.add('hidden');
  }
  // увеличиваем текущий индекс комментариев
  currentCount += COUNT_STEP;
};
// функция очистки комментариев
const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsLoaderNode.removeEventListener('click', renderNextComments);
};

// функция генерации комментариев
const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();
  commentsLoaderNode.addEventListener('click', renderNextComments);
};

export {clearComments, renderComments, bigPictureNode};
