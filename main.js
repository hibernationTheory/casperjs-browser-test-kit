function main(configFile) {

	var test_pageStatus = require('./test_pageStatus.js');

	var fs = require('fs');
	var runTests,
		numTests,
		urls = [];

	var configExists = fs.exists(configFile);
	if (!configExists) {
		casper.test.comment('Config file can\'t be located')
		casper.test.done();
	} else {
		urlsStr = fs.read(configFile);
		urlsData = JSON.parse(urlsStr);
		urls = urlsData.links.map(function(item) {
			return item.link;
		});
		numTests = urls.length;
		runTests = true;
	}

	if (urls.length === 0) {
		casper.test.comment('No given URL\'s to run tests on')
		casper.test.done();
	};

	urls.forEach(function(url) {
		casper.test.begin('Test the page status for: ' + url, 2, 
		function(test) {
			test_pageStatus(test, url);
		});
	});
}

module.exports = main;