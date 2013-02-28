# bind-this

Function scope binding with partial application.

## Usage

Require the module. Available on `npm` as `bind-this`.

```js
var bind = require('bind-this');
```

### Binding

In most cases you will want to bind to the immediate scope, passing a function will return a new function bound to the current `this` value.

```js
this.foo = 'bar';

var bound = bind(function () {
	return this.foo;
});

// Try and 'override' the context
bound.call({}); // 'bar'
```

Pass a scope to scope to override the default context.

```js
this.foo = 'bar';

var bound = bind({ foo: 'baz' }, function () {
	return this.foo;
});

bound(); // 'baz'
```

Pass a string instead of of a function to resolve the function from the context.

```js
var parseRadixTen = bind('parseInt', null, 10);
```

### Partial Application

Any further arguments will be used to partially apply the function. Pass `null` to 'skip' a parameter.

```js
var append = function (str, append) {
	return str + append;
};

var appendBar = bind(append, null, 'bar');

appendBar('foo'); // 'foobar'
```

## Tests

```bash
$ npm test
```
