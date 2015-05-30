
function getStorage() {
navigator.webkitPersistentStorage.requestQuota (1024*1024*1024, function(grantedBytes) {
  console.log ('requestQuota: ', arguments);
  requestFS(grantedBytes);
}, errorHandler);

function requestFS(grantedBytes) {
	  console.log("In requestFS : " + grantedBytes );
  window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, errorHandler);
}

}



function errorHandler(e) {
	console.log('In errorHandler...oops')
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
	console.log("Starting onInitFs");
  fs.root.getFile('c:\\Temp\\logFile.txt', {create: true}, function(fileEntry) {

    fileEntry.createWriter(function(fileWriter) {  // FileWriter
    	console.log('CreateWriter: ' + fileWriter)
        fileWriter.onwrite = function(e) {
          console.log('Write completed.');
        };

        fileWriter.onerror = function(e) {
          console.log('Write failed: ' + e);
        };
        console.log(fileWriter);
        //var aFileParts = 'asom,asdfia dasfawein afae';
        var bb = new Blob(['lol'], {type : 'text/plain'});  // the blob

        fileWriter.write(bb);
        console.log(fileEntry.isFile + ' / ' + fileEntry.toURL());
        //ar generatedFile = new File(["Rough Draft ...."], 'c:\Temp\logFile.txt', {type: "text/plain"; lastModified: "4/5/1900"});
        //saveAs(bb, 'something.txt');
    }, errorHandler);
  });
}




function logconsole() {
	console.log("bytes granted on RequestFileSystem");
}





