import { debounce } from './util.js';
import { renderThumbnails } from './thumbnails.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
let currentFilter = 'filter-default';
let pictures = [];
const filterElement = document.querySelector('.img-filters');

const debounceRender = debounce(renderThumbnails);

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SORTFUNC = {
  sortRandom: () => 0.5 - Math.random(),
  sortDiscussed: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;

function onFilterChange (evt) {
  const targetButton = evt.target;

  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (
    !activeButton ||
    !targetButton.matches('button') ||
    activeButton === targetButton
  ) {
    return;
  }

  activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);

  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];

  switch (currentFilter) {
    case Filter.DEFAULT:
      filteredPictures = pictures;
      break;
    case Filter.RANDOM:
      filteredPictures = pictures.toSorted(SORTFUNC.sortRandom).slice(0, MAX_PICTURE_COUNT);
      break;
    case Filter.DISCUSSED:
      filteredPictures = pictures.toSorted(SORTFUNC.sortDiscussed);
      break;
  }

  debounceRender(filteredPictures);
}

export function initFilter(photos) {
  filterElement.classList.remove('img-filters--inactive');

  filterElement.addEventListener('click', onFilterChange);

  pictures = photos;
}
