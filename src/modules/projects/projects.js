const $filters = $('.projects__filters');
const filtersActiveClass = 'projects__filters--active';

$('.projects__open button').on('click', () => {
  $filters.addClass(filtersActiveClass);
});

$('.projects__close button').on('click', () => {
  $filters.removeClass(filtersActiveClass);
});
