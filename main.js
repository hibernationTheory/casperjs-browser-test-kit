function main(dataFile, configFile) {

	var fs = require('fs');
	var fs_helpers = require('./utils/fs_helpers');
	var	urls = [];
	var modules = [];

	// read in the data file
	var dataExists = fs.exists(dataFile);
	if (!dataExists) {
		casper.test.comment('Data file can\'t be located')
		casper.test.done();
	} else {
		var urlsStr = fs.read(dataFile);
		var urlsData = JSON.parse(urlsStr);
		var urls = urlsData.links || [];
		urls = urls.map(function(item) {
			return item.link;
		});
	}

	var configExists = fs.exists(configFile)
	if (configExists) {
		// if a config file is given use the tests array in there 
		// to see which tests to run.
		var testsStr = fs.read(configFile)
		var testsData = JSON.parse(testsStr);
		var tests = testsData.tests || [];
		modules = tests.map(function(test) {
			return './tests/' + test + '.js';
		})
	} else {
		// if a config file is not given, use the contents of the ./tests folder
		// to see which tests to run.
		modules = fs_helpers.getFilesInFolder('./tests');
	}

	if (urls.length === 0) {
		casper.test.comment('No given URL\'s to run tests on')
		casper.test.done();
	};

	urls.forEach(function(url) {
		modules.forEach(function(mod) {
			require(mod)(url);
		});
	});
}

module.exports = main;