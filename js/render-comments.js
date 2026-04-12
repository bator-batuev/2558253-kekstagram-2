const COUNT_STEP = 5;
let currentCount = 0;
let currentComments = [];

const pictureElement = document.querySelector('.big-picture');
const commentsElement = pictureElement.querySelector('.social__comments');
const commentTemplate = commentsElement.querySelector('.social__comment');
const commentsCounter = pictureElement.querySelector('.social__comment-count');
const commentsLoader = pictureElement.querySelector('.social__comments-loader');

const onCommentLoaderClick = () => {
  renderNextComments();
};

function renderNextComments () {
  if (!currentComments) {
    return;
  }

  const start = currentCount;
  const end = start + COUNT_STEP;

  const renderedComments = currentComments.slice(start, end);
  const renderedCommentsLength = renderedComments.length + currentCount;
  const commentsFragment = document.createDocumentFragment();

  renderedComments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentElement);
  });

  commentsElement.append(commentsFragment);

  commentsCounter.firstChild.textContent = `${renderedCommentsLength}`;
  commentsCounter.querySelector('.social__comment-total-count').textContent = currentComments.length;

  if (renderedCommentsLength >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
}

export const clearComments = () => {
  currentCount = 0;
  currentComments = [];
  commentsElement.innerHTML = '';

  commentsLoader.classList.remove('hidden');

  commentsLoader.removeEventListener('click', onCommentLoaderClick);
};

export const renderComments = (comments) => {
  currentComments = comments;

  renderNextComments(comments);

  commentsLoader.addEventListener('click', onCommentLoaderClick);
};
