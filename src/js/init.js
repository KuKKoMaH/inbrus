import Breakpoints  from 'breakpoints-js';
import SmoothScroll from 'smooth-scroll';
import baron        from 'baron';
import noUiSlider   from 'nouislider';
import initSlider   from './initSlider';
import scriptLoader from './scriptLoader';

__webpack_public_path__ = window.JS_PUBLIC_PATH || '/js/';

Breakpoints({
  sm: {
    min: 0,
    max: 767,
  },
  md: {
    min: 768,
    max: 1299,
  },
  lg: {
    min: 1300,
    max: Infinity,
  },
});

$('.select').each(( i, el ) => {
  const $select = $(el);
  let inited = false;
  $select.selectize({
    maxItems:       1,
    onDropdownOpen: ( $dropdown ) => {
      if (inited) return false;
      inited = true;
      $dropdown.append('<div class="select__track"><div class="select__bar"></div></div>');
      const scroller = baron({
        root:     $dropdown[0],
        scroller: $dropdown.find('.selectize-dropdown-content')[0],
        bar:      $dropdown.find('.select__bar')[0],
      });
    },
  });
});

initSlider('.gallery__slider', ( $wrapper ) => ({
  slidesPerView: 1,
  spaceBetween:  0,
  loop:          true,
  autoHeight:    true,
  wrapperClass:  'gallery__items',
  slideClass:    'gallery__item',
  lazy:          {
    loadPrevNext: true,
  },
  navigation:    {
    prevEl: $wrapper.parents('.gallery').find('.navBtn--prev')[0],
    nextEl: $wrapper.parents('.gallery').find('.navBtn--next')[0],
  },
}), { sm: true, md: true, lg: true });

const formatCurrency = ( value, separator ) => {
  if (separator === undefined) separator = '\u00A0';

  let rub = ('' + Math.floor(value)).replace(/./g, ( c, i, a ) => {
    return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? separator + c : c;
  }).trim();

  // let cop = value % 100;
  // if (cop < 10) cop = '0' + cop;

  // const isNegative = value < 0;

  return rub;
};
const initSliders = () => {
  $('.slider').each(( i, el ) => {
    const { start, from, to } = el.dataset;

    const $el = $(el);
    const $slider = $el.find('.slider__ui');
    const $from = $el.find('.slider__input--from input');
    const $to = $el.find('.slider__input--to input');

    if ($slider[0].noUiSlider) return;

    const slider = noUiSlider.create($slider[0], {
      connect: true,
      // tooltips: true,
      start:   start ? JSON.parse(start) : [+from, +to],
      range:   {
        'min': +from,
        'max': +to,
      },
      step:    1,
    });
    slider.on('update', function ( values, handle ) {
      $from.val(formatCurrency(+values[0]));
      $to.val(formatCurrency(+values[1]));
    });

    $from.on('change', ( e ) => {
      slider.set([e.delegateTarget.value]);
    });
    $to.on('change', ( e ) => {
      slider.set([, e.delegateTarget.value]);
    });
  });
};
window.initSliders = initSliders;
initSliders();

const $popupGalleries = $('.popupGallery');
if ($popupGalleries.length) {
  import('./initGallery').then(( { default: initGallery } ) => {
    $popupGalleries.each(( i, el ) => {
      const $el = $(el);
      initGallery({
        $items: $el.find('.popupGallery__item'),
      });
    });
  });
}


window.smoothscroll = new SmoothScroll('a[href*="#"]', { /*header: '.header__container'*/ });

$('.file').each(( i, el ) => {
  const $el = $(el);
  const $name = $el.find('.file__name');
  const originalText = $name.text();
  $el.find('input[type="file"]').on('change', function () {
    const files = $(this)[0].files;
    $name.text(files.length ? files[0].name : originalText);
  });
});

$('input[type="tel"]').mask("+7 (999) 999-99-99");

const $share = $('.share');
if ($share.length) {
  scriptLoader('https://yastatic.net/share2/share.js', () => {
    Ya.share2('share', {
      theme: {
        bare: true,
      },
    });
  });
}
