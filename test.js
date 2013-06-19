var assert = require('assert');
var bindThis = require('./bind-this');
var test = require('tiny-runner');

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

test('binds to global object if no context given', function () {
	var func = function () {
		return this.foo;
	};

	global.foo = 'bar';

	var bound = bindThis(func);

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