function slice (args, from, to) {
	return Array.prototype.slice.call(args, from, to);
}

function fillAndConcat (arr1, arr2) {
	for (var i = 0; i < arr1.length; i += 1) {
		if (arr1[i] === null) arr1[i] = arr2.shift();
	}
	return arr1.concat(arr2);
}

var bindThis = function (context, fn) {
	var partialArgs;

	if (typeof context === 'function') {
		partialArgs = slice(arguments, 1);
		fn = context;
		context = this;
	} else {
		partialArgs = slice(arguments, 2);
	}

	return (function (context, fn, partialArgs) {
		return function () {
			var args = fillAndConcat(partialArgs, slice(arguments));

			if (typeof fn === 'string') {
				fn = context[fn];
			}
			return fn.apply(context, args);
		};
	})(context, fn, partialArgs);
};

bindThis.all = function (context) {
	var fnKeys = slice(arguments, 1);

	fnKeys.forEach(function (key) {
		if (typeof key !== 'string') { return; }
		context[key] = bindThis(context, context[key]);
	});
};

module.exports = bindThis;