# bind-this

Function scope binding with partial application.

## Usage

Require the module. Available on `npm` as `bind-this`.

```js
var bind = require('bind-this');
```

### Binding

In most cases you will want to pass `this` and a function, this will return a new function bound to the current context.

```js
this.foo = 'bar';

var bound = bind(this, function () {
	return this.foo;
});

// Try and 'override' the context
bound.call({}); // 'bar'
```

Note that the global scope will be used by default unless otherwise specified.

Pass a string instead of of a function to resolve the function from the context.

```js
var parseRadixTen = bind(this, 'parseInt', null, 10);
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
