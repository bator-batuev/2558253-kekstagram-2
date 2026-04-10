const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const sliderElement = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
export const imgPreview = imgUploadWrapper.querySelector('.img-upload__preview img');

let currentEffect = 'none';

const effects = {
  none: {
    style: null
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    style: (v) => `grayscale(${v})`
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    style: (v) => `sepia(${v})`
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    style: (v) => `invert(${v}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    style: (v) => `blur(${v}px)`
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    style: (v) => `brightness(${v})`
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

export const resetFilter = () => {
  effectLevel.classList.add('hidden');
  imgPreview.className = 'img-upload__preview effects__preview--none';

  imgPreview.style.filter = '';
  effectLevelValue.value = 0;
};

effectLevel.classList.add('hidden');

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = parseFloat(sliderElement.noUiSlider.get());

  effectLevelValue.value = Number.isInteger(sliderValue) ? sliderValue.toFixed(0) : sliderValue.toFixed(1);

  if (currentEffect !== 'none' && effects[currentEffect].style) {
    imgPreview.style.filter = effects[currentEffect].style(effectLevelValue.value);
  } else {
    imgPreview.style.filter = 'none';
  }
});

export const onEffectChange = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    imgPreview.style.filter = 'none';

    effectLevel.classList.add('hidden');
  } else {
    const { min, max, step } = effects[currentEffect];

    sliderElement.noUiSlider.updateOptions({
      range: { min, max },
      start: max,
      step,
    });

    effectLevel.classList.remove('hidden');
  }
};
