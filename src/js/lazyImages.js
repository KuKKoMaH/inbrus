import LazyLoad from "vanilla-lazyload";

let loadedAll = false;
let loadedAllCb = null;

const lazyLoad = new LazyLoad({
  elements_selector: '.lazy, .lazyBg',
  callback_loaded:   ( el ) => {
    el.dataset.loaded = 'true';
    showImage(el);
  },
  callback_finish:   ( el ) => {
    loadedAll = true;
    if (loadedAllCb) loadedAllCb();
  },
});

var callback = function ( entries ) {
  // inViewport = [];
  // console.log(entries);
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      // inViewport.push(entry.target);
      entry.target.dataset.viewed = 'true';
      showImage(entry.target);
    }
  }
};
var observer = new IntersectionObserver(callback, { threshold: 0 });
$('.lazy').each(( i, el ) => observer.observe(el));

function showImage( el ) {
  const { loaded, viewed } = el.dataset;
  if (loaded && viewed) {
    el.classList.add('lazy--visible');
  }
}

const loadAll = () => {
  lazyLoad.loadAll();
  $('img[data-src]').each(( i, img ) => {
    img.dataset.viewed = 'true';
    // img.src = img.dataset.src;
  });
};

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (!isSafari) {
  window.onbeforeprint = loadAll;
} else {
  // Safari doesn't support the onbeforeprint event
  var mediaQueryList = window.matchMedia('print');
  mediaQueryList.addListener(function ( mql ) {
    if (mql.matches) {
      loadAll();
    }
  });
}

window.printPage = () => {
  if (!loadedAll) {
    loadedAllCb = window.print;
    loadAll();
  } else {
    window.print();
  }
};

window.updateLazyImages = () => {
  lazyLoad.update();
  $('.lazy').each(( i, el ) => observer.observe(el));
};

