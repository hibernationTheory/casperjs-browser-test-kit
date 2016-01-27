var domHelpers = require('../utils/dom_helpers.js');

function main(url) {

	casper.test.begin('Test the accessibility for: ' + url, 0, 
		function(test) {
			testSuite(test, url);
		}
	);

	function testSuite(test, url) {
		casper.start(url, function() {
		});

		casper.then(function() {
			// the html element needs to have a lang attribute.
			test.assertExists('html[lang]', 'A html element with a "lang" attribute exists', null, {doThrow:false});	
		})

		casper.then(function() {
			// have a title element to define the simple purpose of the page
			test.assertExists('head title', 'A title element exists inside the head');
		});

		casper.then(function() {
			// images should have an alt attribute
			var imagesWithNoAltAttr = this.evaluate(domHelpers.checkSelectorForAttr, 'img', 'alt');
			if (imagesWithNoAltAttr && imagesWithNoAltAttr.length > 0) {
				test.fail('Some images don\'t have an "alt" attribute: \n' + imagesWithNoAltAttr.join('\n'));
			}
		});

		casper.then(function() {
			// abbr and acronym elements should have a title attribute.
			var abbrWithNoTitle = this.evaluate(domHelpers.checkSelectorForAttr, 'abbr', 'title');
			if (abbrWithNoTitle && abbrWithNoTitle.length > 0) {
				test.fail('Some abbr elements don\'t have a "title" attribute: \n' + abbrWithNoTitle.join('\n'));
			}
		});

		casper.then(function() {
			var acronymWithNoTitle = this.evaluate(domHelpers.checkSelectorForAttr, 'acronym', 'title');
			if (acronymWithNoTitle && acronymWithNoTitle.length > 0) {
				test.fail('Some acronym elements don\'t have a "title" attribute: \n' + acronymWithNoTitle.join('\n'));
			}
		});

		casper.then(function() {
			//For each form, check that it has a submit button (input type="submit", input type="image", or button type="submit")
			if ( this.exists('form') ) {
				var exists = this.evaluate(domHelpers.checkAllElementsForAnyTargetSelector, 'form', ['input[type="submit"]']);
				test.assert(exists, 'All forms have a submit button in them');
			};
		});

		casper.then(function() {
			//For each form, check that a fieldset element exists inside the form
			if ( this.exists('form') ) {
				var exists = this.evaluate(domHelpers.checkAllElementsForAnyTargetSelector, 'form', ['fieldset']);
				test.assert(exists, 'All forms have a fieldset element in them');
			};

			//For each fieldset, check that a legend element exists inside the fielset element
			if ( this.exists('form') && this.exists('fieldset') ) {
				var exists = this.evaluate(domHelpers.checkAllElementsForAnyTargetSelector, 'fieldset', ['legend']);
				test.assert(exists, 'All fieldsets have a legend element in them');
			};
		});

		casper.then(function() {
			//For each article element, check that a heading elements exists inside
			if ( this.exists('article') ) {
				var exists = this.evaluate(domHelpers.checkAllElementsForAnyTargetSelector, 'article', ['h1','h2','h3','h4','h5','h6']);
				test.assert(exists, 'All article elements have a heading element in them');
			};
		});

		casper.then(function() {
			//For each section element, check that a heading elements exists inside
			if ( this.exists('section') ) {
				var exists = this.evaluate(domHelpers.checkAllElementsForAnyTargetSelector, 'section', ['h1','h2','h3','h4','h5','h6']);
				test.assert(exists, 'All section elements have a heading element in them');
			};
		});

		casper.then(function() {
			//This checks to see if all the labels have a 'for' attr and an existing element that 'for' attr points to.
			var selectorForLabel = this.evaluate(domHelpers.checkIfSelectorAttrPointsToElement, 'label', 'for', 'id');
			if (selectorForLabel && selectorForLabel.length > 0) {
				test.fail('Some labels don\'t have a "for" attribute or a corresponding input field: \n' + selectorForLabel.join('\n'));
			}
		});

		casper.then(function() {
			//This checks to see if there is a label element with the 'for attr pointing to input element using the input id value.
			var labelForInput = this.evaluate(domHelpers.checkIfSelectorAttrPointsToElement, 'input', 'id', 'for');
			if (labelForInput && labelForInput.length > 0) {
				test.fail('Some inputs don\'t have an "id" attribute or a corresponding label field: \n' + labelForInput.join('\n'));
			}
		});

		casper.then(function() {
			//Using the title attribute of the frame and iframe elements
			var frameWithNoTitleAttr = this.evaluate(domHelpers.checkSelectorForAttr, 'frame', 'title');
			if (frameWithNoTitleAttr && frameWithNoTitleAttr.length > 0) {
				test.fail('Some frame elements don\'t have a "title" attribute: \n' + frameWithNoTitleAttr.join('\n'));
			}
			var iframeWithNoTitleAttr = this.evaluate(domHelpers.checkSelectorForAttr, 'iframe', 'title');
			if (iframeWithNoTitleAttr && iframeWithNoTitleAttr.length > 0) {
				test.fail('Some iframe elements don\'t have a "title" attribute: \n' + iframeWithNoTitleAttr.join('\n'));
			}
			var framesWithEmptyTitleAttr = this.evaluate(domHelpers.checkSelectorForAttrValue, 'frame', 'title', '');
			if (framesWithEmptyTitleAttr && framesWithEmptyTitleAttr.length > 0) {
				test.comment('These frame have an empty "title" attr: \n' + framesWithEmptyTitleAttr.join('\n'));
			}
			var iframesWithEmptyTitleAttr = this.evaluate(domHelpers.checkSelectorForAttrValue, 'iframe', 'title', '');
			if (iframesWithEmptyTitleAttr && iframesWithEmptyTitleAttr.length > 0) {
				test.comment('These iframe have an empty "title" attr: \n' + iframesWithEmptyTitleAttr.join('\n'));
			}
		});

		casper.then(function() {
			// check to see if there is a primary heading in the document.
			if (!this.exists('h1')) {
				test.comment('There isn\'t a primary heading in the document');
			}
		})

		casper.then(function() {
			// heading order should not be broken on a page. this means that you can't have an h6 without h5.
			test.assert(domHelpers.checkHeadingOrder(), 'Heading order (h1, h2...) is correct');
		});

		casper.run(function() {
			test.done();
		});
	};
	
}

module.exports = main;