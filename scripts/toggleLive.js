var toggleLive = function() {
  var btnLive = $(this);
  var labelLive = $('.label-live');

  if(btnLive.hasClass('btn-danger')) {
    btnLive.removeClass('btn-danger').addClass('btn-default');
    labelLive.text('Paused');
  } else {
    btnLive.removeClass('btn-default').addClass('btn-danger');
    labelLive.text('Live');
  }
}

$(".btn-live").click(toggleLive);