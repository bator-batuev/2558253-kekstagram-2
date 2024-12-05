import {getEffectSelector, styleFilterByEffects, Effects} from './const.js';
const imgUploadForm = document.querySelector('.img-upload__wrapper'); // форма редактирования изображения
const effectSlider = imgUploadForm.querySelector('.effect-level__slider'); // слайдер
const effectSliderContainer = imgUploadForm.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value'); // поле уровня эффекта
const imgPreview = imgUploadForm.querySelector('.img-upload__preview'); // окно предварительного просмотра изображения
const selectorImg = imgPreview.classList;
const effectRadioBtns = imgUploadForm.querySelectorAll('.effects__radio'); // кнопки выбора эффекта

const getUpdateSliderOptions = (effect, sliderElement) =>
  sliderElement.noUiSlider.updateOptions(Effects[effect]);

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  effectSliderContainer.classList.add('hidden');
  imgPreview.classList.replace(selectorImg, 'effects__preview--none');
};

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if (currentRadioBtn) {
    const effectBtnValue = currentRadioBtn.value;
    imgPreview.classList.replace(selectorImg, getEffectSelector(effectBtnValue));
    getUpdateSliderOptions(effectBtnValue, effectSlider);
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  effectRadioBtns.forEach((item) => {
    if (item.checked) {
      if (item.value !== 'none') {
        effectSliderContainer.classList.remove('hidden');
        imgPreview.style.filter = styleFilterByEffects[item.value](effectLevelValue.value);
      } else {
        resetFilter();
      }
    }
  });
});

export {onEffectRadioBtnClick, resetFilter, imgPreview};
