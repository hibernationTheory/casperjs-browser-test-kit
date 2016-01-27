/*
	UTILITY
*/

function __canFileBeRequired(filename) {
	var result = __checkFileExtension(filename, 'js');
	return result;
}

function __checkFileExtension(filename, extension) {
	// checks to see if the given file name has the given file extension
    var len_f = filename.length;
    var len_e = extension.length;
    var filenameNoExt = filename.substr(0, len_f-len_e);
    if (filenameNoExt.slice(-1) !== '.') {
      return false;
    }
    var filenameExt = filename.substr(len_f-len_e, len_f);
    if (filenameExt === extension) {
      return true;
    }
    return false;
}

/*
	MAIN
*/

function getFilesInFolder(path) {
	var fs = require('fs');

	var files = [];
	if (path.slice(-1) !== '/') {
		path += '/';
	}
	var list = fs.list(path);
	for(var x = 0; x < list.length; x++){
	    var file = path + list[x];
	    if(fs.isFile(file) && __canFileBeRequired(file)) {
	    	files.push(file);
	    }
	}
	return files;
}

module.exports = {
	"getFilesInFolder":getFilesInFolder
}
