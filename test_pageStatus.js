function testSuite(test, url) {
	casper.start(url, function() {
		test.assertHttpStatus(200, 'Page is up and running');
	});

	casper.then(function() {
		test.assert(casper.getCurrentUrl() === url, 'URL is the one expected');
	});

	casper.run(function() {
		test.done();
	});
};

module.exports = testSuite;