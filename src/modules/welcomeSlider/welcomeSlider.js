import initSlider from '../../js/initSlider';

initSlider('.welcomeSlider__slider', {
  slidesPerView: 1,
  spaceBetween:  0,
  loop:          true,
  wrapperClass:  'welcomeSlider__items',
  slideClass:    'welcomeSlider__item',
  pagination:    {
    el:        '.welcomeSlider__pagination',
    clickable: true,
  },
  autoplay:      {
    delay: 5000,
  },
}, { sm: true, md: true, lg: true });

const $slider = $(".welcomeSlider__slider");
if ($slider.length) {
  const swiper = $slider[0].swiper;
  const $container = $slider.parents('.welcomeSlider');
  $container.hover(function () {
    swiper.autoplay.stop();
    $container.addClass('welcomeSlider--paused');
  }, function () {
    swiper.autoplay.start();
    $container.removeClass('welcomeSlider--paused');
  });
}
