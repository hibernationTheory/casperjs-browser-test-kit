urls = ['http://casperjs.org/', 'http://docs.casperjs.org/en/latest/testing.html','http://wrearwarawerw.com/']

casper.test.begin('Test the page', urls.length, function testSuite(test) {
	casper.start();

	casper.each(urls, function(self, url, index) {
		self.thenOpen(url, function() {
			test.assertHttpStatus(200);
		})
	}).run(function() {
		test.done();
	});
});