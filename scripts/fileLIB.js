function getStorage() {

// Request Quota (only for File System API)  
var requestedBytes = 1024*1024*1024; // 10MB

navigator.webkitPersistentStorage.requestQuota (
    requestedBytes, function(grantedBytes) {  
        window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);

    }, function(e) { console.log('Error', e); }
);
}



function logconsole() {
	console.log("bytes granted on RequestFileSystem");
}

function errorHandler(){
  console.log('An error occured');


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



