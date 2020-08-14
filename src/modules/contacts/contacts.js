const $items = $('.contacts__item');
const activeClass = 'contacts__item--active';
$items.on('click', ( e ) => {
  const $el = $(e.delegateTarget);
  $items.removeClass(activeClass);
  $el.addClass(activeClass);
});
