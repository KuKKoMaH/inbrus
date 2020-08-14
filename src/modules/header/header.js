import Breakpoints from 'breakpoints-js';

const $document = $(document);
const $top = $('.header__top');
const $bottom = $('.header__bottom');
const $sub = $('.header__submenu');
const $menu = $('.header__menu');
const $menuButton = $('.header__menu-button');
const bottomFixedClass = 'header__bottom--fixed';
const bottomActiveClass = 'header__bottom--active';
const subActiveClass = 'header__submenu--active';

$menuButton.on('click', () => {
  $bottom.toggleClass(bottomActiveClass);
  $sub.removeClass(subActiveClass);
});

// ===============================================================

$menu.find('a').on('mouseenter click', ( e ) => {
  const $el = $(e.delegateTarget).parent();
  const toggle = $el.data('toggle');
  $sub.removeClass(subActiveClass);
  if (toggle) {
    e.preventDefault();
    const $submenu = $sub.filter('[data-category="' + toggle + '"]');
    $submenu.addClass(subActiveClass);
  }
  // return false;
});
$bottom.on('mouseleave', ( e ) => {
  if (!Breakpoints.is('sm')) $sub.removeClass(subActiveClass);
});

$('.header__back').on('click', ( e ) => {
  e.preventDefault();
  $sub.removeClass(subActiveClass);
});

// ===============================================================

let headerFixed = false;
let menuOffset = $top.outerHeight();

$(window).on('scroll', checkMenuFixed);
$(window).on('resize', () => {
  menuOffset = $top.outerHeight();
  checkMenuFixed();
});

function checkMenuFixed() {
  const scrollTop = $document.scrollTop();

  if (scrollTop > menuOffset && !headerFixed) {
    $bottom.addClass(bottomFixedClass);
    headerFixed = true;
  } else if (scrollTop < menuOffset && headerFixed) {
    $bottom.removeClass(bottomFixedClass);
    headerFixed = false;
  }
}

checkMenuFixed();

// ===============================================================

const $search = $('.header__search');
const $searchInput = $('.header__search-input');
const searchActiveClass = 'header__search--active';
$('.header__menu-search--lg').on('click', ( e ) => {
  $search.addClass(searchActiveClass);
  setTimeout(() => $searchInput.focus(), 100);
});

$('.header__search-close').on('click', ( e ) => {
  $search.removeClass(searchActiveClass);
});

$search.on('click', ( e ) => {
  if (!$(e.target).closest('.header__search-bar').length) {
    $search.removeClass(searchActiveClass);
  }
});

