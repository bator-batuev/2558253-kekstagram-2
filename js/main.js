import './img-upload.js';
import './open-big-picture.js';
import './thumbnails.js';
import './render-comments.js';
import './validation.js';
import './util.js';
import './api.js';
import { initUploadModal } from './img-upload.js';
import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showErrorMessage } from './notification.js';
import { configFilter } from './filter.js';

const bootstrap = async () => {
  try {
    initUploadModal();
    const photos = await getData();
    renderThumbnails(photos);
    configFilter(photos);
  } catch (error) {
    showErrorMessage(error.message);
  }
};
bootstrap();
