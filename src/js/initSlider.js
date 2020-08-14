import { Swiper, Navigation, Pagination, Lazy, Autoplay } from 'swiper';
import Breakpoints                                        from 'breakpoints-js';

Swiper.use([Navigation, Pagination, Lazy, Autoplay]);

export default ( selector, props, initOptions ) => {
  const $wrapper = $(selector);
  if ($wrapper.length) {
    $wrapper.each(( i, el ) => {
      let slider = null;

      const initSlider = () => {
        if (slider) return;
        slider = new Swiper(el, typeof props === 'function' ? props($(el)) : props);
      };

      const destroySlider = () => {
        if (!slider) return;
        slider.destroy();
        slider = null;
      };

      if (!initOptions) initOptions = {
        sm: true,
        md: false,
        lg: false,
      };

      Breakpoints.on('sm', 'enter', () => {
        initOptions.sm ? initSlider() : destroySlider();
      });
      Breakpoints.on('md', 'enter', () => {
        initOptions.md ? initSlider() : destroySlider();
      });
      Breakpoints.on('lg', 'enter', () => {
        initOptions.lg ? initSlider() : destroySlider();
      });
    });
  }
}
