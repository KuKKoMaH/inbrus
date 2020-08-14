var PhotoSwipe = require('photoswipe');
var PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.js');

const $container = $('.pswp');
const $img = $container.find('');
module.exports = function initGalley( config ) {
  var slides = [];
  const inited = {};
  config.$items.each(function ( i, el ) {
    var $el = $(el);
    const index = $el.data('index');
    if (!inited[index]) {
      slides.push({
        src:   $el.attr('href'),
        w:     $el.data('width'),
        h:     $el.data('height'),
        title: $el.data('caption'),
        index: index,
      });
      inited[index] = true;
    }
    $el.on('click', function ( e ) {
      e.preventDefault();
      openGallery(+index);
    });
  });

  slides = slides.sort(( a, b ) => a.index === b.index ? 0 : a.index > b.index ? 1 : -1);

  function openGallery( i ) {
    var gallery = new PhotoSwipe(
      $container[0],
      PhotoSwipeUI_Default,
      slides,
      {
        index:                   i,
        history:                 false,
        closeOnScroll:           false,
        maxSpreadZoom:           1,
        // getDoubleTapZoom:        function ( isMouseClick, item ) {
        //   return item.initialZoomLevel;
        // },
        clickToCloseNonZoomable: false,
        pinchToClose:            false,
      },
    );

    gallery.init();

    // var isDown = false;
    // var $container = $('.pswp__item');
    // $container.on('mousedown.gallery', function ( e ) {
    //   isDown = true;
    //   $container.on('mousemove.gallery', function () {
    //     isDown = false;
    //   });
    //
    //   $container.on('mouseup.gallery', function ( e ) {
    //     $container.off('mouseup.gallery mousemove.gallery');
    //     if (isDown) {
    //       gallery.next();
    //       isDown = false;
    //     }
    //   });
    // });
    //
    // gallery.listen('destroy', function () {
    //   $container.off('mousedown.gallery');
    // });
  }
};
