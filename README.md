# bindThis

Function scope binding with partial application.

## Usage

Require the module.

```js
var bindThis = require('bindThis');
```

### Binding

Pass a function bind to the immediate scope.

```js
this.foo = 'bar';

var bound = bindThis(function () {
	return this.foo;
});

bound(); // 'bar'
```

Pass a scope to scope to override the default context.

```js
var bound = bindThis({ foo: 'bar' }, function () {
	return this.foo;
});

bound(); // 'bar'
```

Pass a string instead of of a function to resolve the function from the context.

```js
var parseRadixTen = bindThis('parseInt', null, 10);
```

### Partial Application

Any further arguments will be used to partially apply the function. Pass `null` to 'skip' a parameter.

```js
var append = function (str, append) {
	return str + append;
};

var appendBar = bindThis(append, null, 'bar');

appendBar('foo'); // 'foobar'
```

## Tests

```bash
$ npm test
```
