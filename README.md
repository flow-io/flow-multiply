flow-multiply
=============

Transform stream factory to perform scalar multiplication on streamed numeric data values.


## Installation

``` bash
$ npm install flow-multiply
```

## API

To create a stream factory,

``` javascript
var multStream = require( 'flow-multiply' );

// Create a new factory:
var mStream = multStream();
```

### mStream.factor( [value] )

This method is a setter/getter. If no `value` is provided, returns the multiplication `factor`; default is `1`. To set the `factor`,

``` javascript
mStream.factor( 3 );
```

### mStream.stream()

To create a new scalar multiplication stream,

``` javascript
var stream = mStream.stream();
```


## Usage

Methods are chainable.

``` javascript
multStream()
	.factor( 3 )
	.stream()
	.pipe( /* writable stream */ );
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	mStream = require( 'flow-multiply' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round(Math.random()*10);
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new scalar multiplication stream:
var stream = mStream()
	.factor( 3 )
	.stream();

// Pipe the data:
readStream.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ) {
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

