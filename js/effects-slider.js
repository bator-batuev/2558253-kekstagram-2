import {getEffectSelector, styleFilterByEffect, Effects} from './const.js';
const imgUploadForm = document.querySelector('.img-upload__wrapper'); // форма редактирования изображения
const effectSlider = imgUploadForm.querySelector('.effect-level__slider'); // слайдер
const effectSliderContainer = imgUploadForm.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value'); // поле уровня эффекта
const imgPreview = imgUploadForm.querySelector('.img-upload__preview img'); // окно предварительного просмотра изображения
const effectRadioBtns = imgUploadForm.querySelectorAll('.effects__radio'); // кнопки выбора эффекта

const updateSliderOptions = (effect, sliderElement) =>
  sliderElement.noUiSlider.updateOptions(Effects[effect]);

const resetFilter = () => {
  effectSliderContainer.classList.add('hidden');
  imgPreview.className = 'img-upload__preview effects__preview--none';
  imgPreview.style.filter = ''; // Сбрасываем фильтр
  effectLevelValue.value = 0;
};

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if (currentRadioBtn) {
    const effectBtnValue = currentRadioBtn.value;
    imgPreview.className = `img-upload__preview ${getEffectSelector(effectBtnValue)}`;
    updateSliderOptions(effectBtnValue, effectSlider);
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.01,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  const sliderValue = parseFloat(effectSlider.noUiSlider.get()); // Преобразуем значение в число
  // Устанавливаем значение в поле ввода в зависимости от того, является ли оно целым числом
  effectLevelValue.value = Number.isInteger(sliderValue) ? sliderValue.toFixed(0) : sliderValue.toFixed(1);
  const checkedButton = Array.from(effectRadioBtns).find((radio) => radio.checked);
  if (checkedButton.value !== 'none') {
    effectSliderContainer.classList.remove('hidden');
    const effectClass = getEffectSelector(checkedButton.value);
    imgPreview.className = `img-upload__preview ${effectClass}`;
    imgPreview.style.filter = styleFilterByEffect[checkedButton.value](effectLevelValue.value);
    return;
  }
  resetFilter();
});

export {onEffectRadioBtnClick, resetFilter, imgPreview};
