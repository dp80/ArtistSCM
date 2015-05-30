var $slider = $("#slider");
var sliderConfig = {
  'min': 1,
  'max': 2,
  'value': 1
};

var sliderChangedFn = function(event, ui) {
  console.log("sliderChangedFn");
  //Abort live
  if($('.btn-live').hasClass('btn-danger first-time')) {
    $('.btn-live').trigger('click');
    $('.btn-live').removeClass('first-time');
  }

  var max = $(this).slider("option", "max");

  if(ui.value === max) {
    showVideo();
  } else {
    $('#video').addClass('hide');
    $('.img-container').removeClass('hide');
    $('.img-container').attr( "src", 'images/raw/' + ui.value + '.png' );
  }
};

var showVideo = function() {
  $('#video').removeClass('hide');
  $('.img-container').addClass('hide');
}

var changeSliderMaxFn = function(newMax, updateValueToMax) {
  console.log("changeSliderMaxFn");
  var setValue = updateValueToMax;

  $slider.slider( "option", "max", newMax );

  if(setValue != false) {
    $slider.slider("value", newMax);
  }
}

$.fn.addSliderSegments = function (amount, orientation) {
  return this.each(function () {
    if (orientation == "vertical") {
      var output = ''
        , i;
      for (i = 1; i <= amount - 2; i++) {
        output += '<div class="ui-slider-segment" style="top:' + 100 / (amount - 1) * i + '%;"></div>';
      };
      $(this).prepend(output);
    } else {
      var segmentGap = 100 / (amount - 1) + "%"
        , segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
      $(this).prepend(segment.repeat(amount - 2));
    }
  });
};

$slider.slider({
  min: sliderConfig.min,
  max: sliderConfig.max,
  value: sliderConfig.value,
  orientation: "horizontal",
  range: "min",
  slide: sliderChangedFn
}).addSliderSegments($slider.slider("option").max);
