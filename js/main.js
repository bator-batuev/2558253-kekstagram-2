import { renderThumbnails } from './thumbnails.js';
import { initUploadModal } from './upload-picture.js';
import { getData } from './api.js';
import { showErrorMessage } from './notification.js';

const bootstrap = async () =>{
  try {
    initUploadModal();

    const photos = await getData();

    renderThumbnails(photos);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();
