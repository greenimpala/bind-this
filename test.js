var assert = require('assert');
var bindThis = require('./bind-this');

test('binds to a given context', function () {
	var func = function () {
		return this.foo;
	};

	var bound = bindThis({ foo: 'bar' }, func);

	assert.equal(bound(), 'bar');
});

test('can partially apply function', function () {
	var func = function () {
		return arguments;
	};

	var bound = bindThis({}, func, 'foo');
	var args = bound('bar');

	assert.equal(args[0], 'foo');
	assert.equal(args[1], 'bar');
});

test('binds to \'this\' implicitly if no context given', function () {
	var func = function () {
		return this.foo;
	};

	var bound = bindThis.call({ foo: 'bar' }, func); // Fake the context

	assert.equal(bound(), 'bar');
});

test('can partially apply when no context given', function () {
	var func = function () {
		return arguments;
	};

	var bound = bindThis(func, 'foo');
	var args = bound('bar');

	assert.equal(args[0], 'foo');
	assert.equal(args[1], 'bar');
});

test('resolve function from context when string given', function () {
	var context = {
		foo: function () {
			return 'bar';
		}
	};

	var bound = bindThis(context, 'foo');

	assert.equal(bound(), 'bar');
});

test('can skip parameters with null when partially applying', function () {
	var bound = bindThis(function () {
		return arguments;
	}, null, 'foo');

	var args = bound('bar');

	assert.equal(args[0], 'bar');
	assert.equal(args[1], 'foo');
});

test('can bind all functions', function () {
	var context = {
		foo: 'bar',
		one: function () { return this.foo; },
		two: function () { return this.foo; }
	};

	bindThis.all(context, 'one', 'two');

	// Attempt to override the context
	assert.equal(context.one.call({}), 'bar');
	assert.equal(context.two.call({}), 'bar');
});

/* Test runner */
function test (name, fn) {
	var thrown, red = '\x1B[31m', green = '\x1B[32m', white = '\x1B[37m';
	try { fn(); } catch (e) { thrown = e; }
	console.log((thrown ? red + '✖ Failed: ' : green + '✓ Passed: ') + white + name);
	if (thrown) console.log('\n\u0009' + thrown + '\n');
}