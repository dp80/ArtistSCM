window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem; 
window.directoryEntry = window.directoryEntry || window.webkitDirectoryEntry;

function saveFile(fs){
	window.requestFileSystem(window.PERSISTENT, 1024*1024*1024, initFS,errorHandler)

	fs.root.getDirectory('Documents', {create: true}, function(directoryEntry) {
  		alert('You have just created the ' + dirEntry.name + ' directory.');
	}, errorHandler);

}

function initFS(fs){
  alert("Welcome to Filesystem! It's showtime :)"); // Just to check if everything is OK :)
  // place the functions you will learn bellow here
}

function errorHandler(){
  console.log('An error occured');
}

