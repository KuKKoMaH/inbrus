// $('.about__content').each(( i, el ) => {
//   const $el = $(el);
//   const $text = $el.find('.about__text');
//   const $inner = $el.find('.about__inner');
//   const $more = $el.find('.about__more');
//   if ($inner.height() > $text.height()) {
//     $more.addClass('about__more--active');
//
//     $more.find('button').on('click', () => {
//       $more.removeClass('about__more--active');
//       $text.css('max-height', $inner.height());
//       setTimeout(() => {
//         $text.addClass('about__text--full');
//       }, 1000);
//     });
//
//   }
// });
