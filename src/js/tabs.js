const headerActiveClass = 'tabs__header--active';
const bodyActiveClass = 'tabs__body--active';

$('.tabs').each(( i, el ) => {
  const $container = $(el);
  const $headers = $container.find('> .tabs__headers > .tabs__header');
  const $bodies = $container.find('> .tabs__content > .tabs__body');

  $headers.on('click', ( e ) => {
    const $el = $(e.delegateTarget);
    const index = $el.index();
    $headers.removeClass(headerActiveClass);
    $bodies.removeClass(bodyActiveClass);
    $el.addClass(headerActiveClass);
    $bodies.eq(index).addClass(bodyActiveClass);
  });
});
