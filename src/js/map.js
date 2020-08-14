import scriptLoader from './scriptLoader';

const $maps = $('.map');

let inited = false;
const initMap = () => {
  if (inited) return;
  inited = true;
  scriptLoader(`https://api-maps.yandex.ru/2.1/?lang=ru_RU`, () => {
    ymaps.ready(() => {
      $maps.each(( i, el ) => {
        let { center, zoom, address } = el.dataset;

        try {
          center = JSON.parse(center);
          zoom = +zoom || 16;

          const myMap = new ymaps.Map(el, {
            center:   center,
            controls: ['fullscreenControl', 'zoomControl'],
            zoom:     zoom,
          });

          myMap.geoObjects.add(new ymaps.Placemark(center, { balloonContent: address }));

        } catch (e) {
          console.log(e);
        }
      });
    });
  });
};

if ($maps.length) {
  var observer = new IntersectionObserver(( entries ) => {
    const entry = entries[0];
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      initMap();
    }
  }, { threshold: 0 });
  observer.observe($maps[0]);
}
