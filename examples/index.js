var eventStream = require( 'event-stream' ),
	mStream = require( './../lib' );

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