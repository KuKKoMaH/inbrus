import MicroModal from 'micromodal';

let isSomeOpened = false;

const config = {
  disableScroll:       true,
  awaitCloseAnimation: true,
  onShow:              ( modal, button, event ) => {
    isSomeOpened = true;
    if (!event) return;
    let $el = $(event.target);
    if (!$el.data('youtubeId')) $el = $el.parents('[data-youtube-id]');
    const youtubeId = $el.data('youtubeId');
    if (youtubeId) {
      const iframe = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`;
      $(modal).find('.modal__iframe').html(iframe);
    }
  },
  onClose:             modal => {
    isSomeOpened = false;
    $(modal).find('iframe').remove();
  },
};

MicroModal.init(config);

window.showModal = ( modalId ) => {
  $('.modal.is-open').each(( i, el ) => {
    if (el.id === modalId) return;
    MicroModal.close(el.id);
  });
  MicroModal.show(modalId, config);

};

window.showThank = () => showModal('thank-modal');

const selector = window.ABANDON_MODAL;
if (selector) {
  let inited = false;
  let mouseY = 0;
  let shown = false;

  document.addEventListener("mousemove", function ( e ) {
    mouseY = e.clientY;
    if (mouseY > 100) inited = true;
  });

  $(document).mouseleave(function () {
    if (!shown && mouseY < 100 && !isSomeOpened && inited) {
      shown = true;
      showModal(selector);
    }
  });
}
