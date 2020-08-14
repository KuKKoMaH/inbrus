const req           = (cb) => requestAnimationFrame(cb);
const parollerItems = [];
let windowScroll    = $(window).scrollTop();
let windowWidth     = null;
let windowHeight    = null;
let windowCenter    = null;

const updateWindowSizes = () => {
  windowWidth  = window.innerWidth;
  windowHeight = window.innerHeight;
  windowCenter = windowHeight / 2;
};

function easeOutQuad(elapsed, initialValue, amountOfChange, duration) {
  return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
}

function trim(value) {
  return Math.max(-1, Math.min(1, value))
}

const updateParoller = () => {
  parollerItems.forEach(({ el, top, bottom, height }) => {
    if (bottom < windowScroll || top > windowScroll + windowHeight) return;
    const elCenter     = top - windowScroll + height / 2;
    const factor       = -trim((elCenter - windowCenter) / windowCenter);
    // const offset       = easeOutQuad(factor, 0, height * .05, 1);
    const dir          = factor > 0 ? 1 : -1;
    const offset       = easeOutQuad(factor, 0, 50 * dir, dir);
    el.style.transform = 'translate(0,' + Math.floor(offset) + 'px)';
  });
};
$(window)
  .on('resize', () => {
    updateWindowSizes();
    req(updateParoller);
  })
  .on('scroll', () => {
    windowScroll = $(window).scrollTop();
    req(updateParoller);
  });
updateWindowSizes();

window.paroller = (e) => {
  const el                      = e.target.parentElement;
  const { height, top, bottom } = el.getBoundingClientRect();
  parollerItems.push({ el, top: windowScroll + top, bottom: windowScroll + bottom, height });
  req(() => {
    updateParoller();
  })
};