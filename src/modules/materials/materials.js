const labelActiveClass = 'materials__label--active';
const textActiveClass = 'materials__text--active';
const $labels = $('.materials__label');
const $texts = $('.materials__text');
const $arrow = $('.materials__arrow');
const $container = $('.materials__container');
const $texts_container = $('.materials__texts');

$labels.on('click', ( e ) => {
  const $el = $(e.delegateTarget);
  const index = $el.index();
  $labels.removeClass(labelActiveClass);
  $texts.removeClass(textActiveClass);
  $el.addClass(labelActiveClass);
  $texts.eq(index).addClass(textActiveClass);
  $arrow.css(
    'top',
    Math.max(
      0,
      Math.min(
        $el.offset().top - $container.offset().top,
        $texts_container.height() - $arrow.outerHeight(),
      ),
    ) + 'px',
  );
});
