function checkSelectorForAttr(selector, attr) {
	var results = [];
	var elements = document.querySelectorAll(selector);
	if (elements.length === 0) {
		return null;
	}
	for (var i = 0; i<elements.length; i++) {
		var current = elements[i];
		var hasAttr = current.hasAttribute(attr);
		if (!hasAttr) {
			results.push(current.outerHTML);
		}
	}
	return results;
}

function checkSelectorForAttrValue(selector, attr, value) {
	var results = [];
	var elements = document.querySelectorAll(selector);
	if (elements.length === 0) {
		return null;
	}
	for (var i = 0; i<elements.length; i++) {
		var current = elements[i];
		var attrValue = current.getAttribute(attr);
		if (attrValue === value) {
			results.push(current.outerHTML);
		}
	}
	return results;
}

function checkIfSelectorAttrPointsToElement(selector, attr, elAttr) {
	var results = [];
	var elements = document.querySelectorAll(selector);
	if (elements.length === 0) {
		return null;
	}
	for (var i = 0; i<elements.length; i++) {
		var target;
		var current = elements[i];
		var attrValue = current.getAttribute(attr);
		if (attrValue) {
			var target = document.querySelector('[' + elAttr + '=' + attrValue + ']');
		}
		if (!target || attrValue === null) {
			results.push(current.outerHTML);
		}
	}
	return results
}

function checkAllElementsForAnyTargetSelector(elSelector, targetSelectors) {
	var elements = document.querySelectorAll(elSelector);
	var existAmount = 0;

	for (var i=0; i<elements.length; i++) {
		var currEl = elements[i];
		var exists = false;
		for (var k=0; k<targetSelectors.length; k++) {
			var targetSelector = targetSelectors[k];
			var target = currEl.querySelector(targetSelector);
			if (target) {
				exists = true;
			}
		}
		if (!exists) {
			return false;
		}
	}
	return true;
}

function checkHeadingOrder() {
	var results = [];
	var heading = 6;
    var mustExists = false;
	for (heading; heading >=1; heading--) {
		var currentSelector = 'h' + heading;
        var selection = document.querySelector(currentSelector);
        
        if (mustExists) {
          if (!selection || selection.length === 0) {
            console.log('missing the heading h'+heading.toString() + ' before heading h'+(heading+1).toString());
            return false;
          }
        }
        if (selection && heading>1) {
          mustExists = true;
        }
	}
	return true;
}

module.exports = {
	"checkSelectorForAttr":checkSelectorForAttr,
	"checkSelectorForAttrValue":checkSelectorForAttrValue,
	"checkIfSelectorAttrPointsToElement":checkIfSelectorAttrPointsToElement,
	"checkAllElementsForAnyTargetSelector":checkAllElementsForAnyTargetSelector,
	"checkHeadingOrder":checkHeadingOrder
}