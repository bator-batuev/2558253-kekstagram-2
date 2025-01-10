const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPictureNode = document.querySelector('.big-picture');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
socialCommentsNode.innerHTML = '';

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderCommentsLength = renderedComments.length + currentCount;
  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);
    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.appendChild(socialCommentNode);
  });
  socialCommentsNode.appendChild(socialCommentsFragment);
  commentsCountNode.firstChild.textContent = `${renderCommentsLength}`;
  commentsCountNode.querySelector('.social__comment-total-count').textContent = comments.length;
  if (renderCommentsLength >= comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsLoaderNode.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();
  commentsLoaderNode.addEventListener('click', renderNextComments);
};

export {clearComments, renderComments, bigPictureNode};
