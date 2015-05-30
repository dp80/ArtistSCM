
function getStorage() {
navigator.webkitPersistentStorage.requestQuota (1024*1024*1024, function(grantedBytes) {
  console.log ('requestQuota: ', arguments);
  requestFS(grantedBytes);
}, errorHandler);

function requestFS(grantedBytes) {
  window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function(fs) {
    console.log ('fs: ', arguments); // I see this on Chrome 27 in Ubuntu
  }, errorHandler);
}

}



function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

function onInitFs(fs) {

  fs.root.getFile('c:\\Temp\\logFile.txt', {create: true}, function(fileEntry) {

    fileEntry.createWriter(function(writer) {  // FileWriter

        writer.onwrite = function(e) {
          console.log('Write completed.');
        };

        writer.onerror = function(e) {
          console.log('Write failed: ' + e);
        };

        var bb = new BlobBuilder();
        bb.append('Lorem ipsum');
        writer.write(bb.getBlob('text/plain'));

    }, errorHandler);
  });
}




function logconsole() {
	console.log("bytes granted on RequestFileSystem");
}





