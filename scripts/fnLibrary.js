(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 400;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  var isLive = false;
  var recordInterval;
  var timeoutInterval = 500;

  var toggleLive = function() {
    var btnLive = $(this);
    var labelLive = $('.label-live');

    if(btnLive.hasClass('btn-danger')) {
      isLive = false;
      btnLive.removeClass('btn-danger').addClass('btn-default');
      labelLive.text('Paused');
    } else {
      isLive = true;
      btnLive.removeClass('btn-default').addClass('btn-danger');
      labelLive.text('Live');
    }

    if(isLive) {
      showVideo();  
      recordInterval = setInterval(function(){takepicture();},timeoutInterval);
    } else {
      clearInterval(recordInterval);
    }
  }

  function startup() {
    $(".btn-live").click(toggleLive);

    console.log("Starting startup in fnLibrary.js");
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      console.log("Starting takepicture");
      deletefile();
      createdir();
      setInterval(function(){takepicture();},500);
      // takepicture();
      ev.preventDefault();

    }, false);
    
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    console.log("in takepicture : ");
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      data = data.replace(/^data:image\/\w+;base64,/, "");
      var buff = new Buffer(data, 'base64');
      savePicture(buff);
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();

//set the picture number value here:
var numPictureCounter = 1;
function savePicture(blbcontent){
  console.log("savePicture in :" + numPictureCounter  );
    var name = "\\images\\raw\\" + numPictureCounter + ".png";
    var fs = require('fs');
    var currentDir = process.cwd();
    console.log("savePicture - CurrentDir: " + currentDir + name);
    fs.writeFile(currentDir + name, blbcontent, function(err) {
        if(err) {
            console.log(err);
        }
    });
    changeSliderMaxFn(numPictureCounter);
    numPictureCounter = numPictureCounter + 1 ;
  }

function createdir(){
   console.log("in createFolder : createdir")
   var fs = require('fs');
  var currentDir = process.cwd();
  
  fs.mkdir(currentDir + "\\images\\raw", function(err) {
        if(err) {
            console.log(err);
        }
    });
}

function deletefile(){
  console.log("in deleteFiles : deleting")
  var fs = require('fs');
  var currentDir = process.cwd();
  var len = 5000;
  for (var i = 0; i < len; i++){

    fs.unlink(currentDir + "\\images\\raw\\" + i + ".png", function(err) {
          if(err) {
              console.log(err);
          }
      });
  }    
}
