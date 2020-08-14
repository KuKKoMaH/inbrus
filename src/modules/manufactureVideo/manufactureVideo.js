$('.manufactureVideo__video').on('click', ( e ) => {
  let $el = $(e.delegateTarget);
  const youtubeId = $el.data('youtubeId');
  if (youtubeId) {
    const iframe = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`;
    $el.find('.video').append(iframe);
  }
});
