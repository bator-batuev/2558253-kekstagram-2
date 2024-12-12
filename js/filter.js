import { debounce } from './util.js';
import { renderThumbnails } from './thumbnails.js';

let currentFilter = 'filter-default';
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debounceRender = debounce(renderThumbnails);

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;

function onFilterChange (evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  switch (true) {
    case !targetButton.matches('button'):
    case activeButton === targetButton:
      return;
    default:
      activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
      targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
      currentFilter = targetButton.getAttribute('id');
      applyFilter();
  }
}

function applyFilter() {
  let filteredPictures = [];
  switch (currentFilter) {
    case FILTER.default:
      filteredPictures = pictures;
      break;
    case FILTER.random:
      filteredPictures = pictures.toSorted(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTER.discussed:
      filteredPictures = pictures.toSorted(SORTFUNC.discussed);
      break;
  }
  debounceRender(filteredPictures);
}

function configFilter(photos) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = photos;
}

export { configFilter };
