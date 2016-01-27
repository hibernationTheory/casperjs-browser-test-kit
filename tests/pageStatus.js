function main(url) {

	casper.test.begin('Test the page status for: ' + url, 2, 
		function(test) {
			testSuite(test, url);
		}
	);

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
	
}

module.exports = main;