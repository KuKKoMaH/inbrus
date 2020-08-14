const $slider = $('.projectInfo__gallery .gallery__slider');
if ($slider.length) {
  const slider = $slider[0].swiper;
  const $thumbs = $('.projectInfo__thumb');
  const thumbActiveClass = 'projectInfo__thumb--active';

  slider.on('slideChange', () => {
    $thumbs.removeClass(thumbActiveClass);
    $thumbs.eq(slider.realIndex).addClass(thumbActiveClass);
  });

  $thumbs.on('click', ( e ) => {
    const $el = $(e.delegateTarget);
    slider.slideTo($el.index() + 1);
  });
}
