import './data.js';
import './img-upload.js';
import './img-edit.js';
import './server-upload.js';
import './open-big-picture.js';
import './img-filter.js';
import './thumbnails.js';
import './render-comments.js';
import './form.js';
import './is-hashtag-valid.js';
import './util.js';
import './api.js';
import { initUploadModal } from './img-upload.js';
import { getData } from './api.js';
import { savePhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { showErrorMessage } from './util.js';
initUploadModal();

const bootstrap = async () => {
  try {
    const photos = await getData();
    savePhotos(photos);
    renderThumbnails(photos);
  } catch (error) {
    showErrorMessage(error.message);
  }
};
bootstrap();
