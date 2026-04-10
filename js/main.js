import { renderThumbnails } from './thumbnails.js';
import { initUploadModal } from './upload-picture.js';
import { getData } from './api.js';
import { showErrorMessage } from './notification.js';
import { initFilter } from './filter.js';

try {
  initUploadModal();

  const photos = await getData();

  renderThumbnails(photos);
  initFilter(photos);
} catch (error) {
  showErrorMessage(error.message);
}
