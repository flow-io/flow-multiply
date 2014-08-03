
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	multStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-multiply', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( multStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to set/get the scalar', function test() {
		var mStream = multStream();
		expect( mStream.scalar ).to.be.a( 'function' );
	});

	it( 'should set the scalar', function test() {
		var mStream = multStream();
		mStream.scalar( 100 );
		assert.strictEqual( mStream.scalar(), 100 );
	});

	it( 'should not allow a non-numeric scalar', function test() {
		var mStream = multStream(),
			values = [
				'5',
				[],
				{},
				null,
				undefined,
				NaN,
				false,
				function(){}
			];
		
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				mStream.scalar( value );
			};
		}
	});

	it( 'should provide a default behavior of having a multiplication factor equal to 1', function test( done ) {
		var data, expected, mStream;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 1,2,3,4,5 ];

		// Create a new scalar multiplication stream:
		mStream = multStream()
			.stream();

		// Mock reading from the stream:
		utils.readStream( mStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, mStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

	it( 'should scale piped data initialized with an arbitrary scalar', function test( done ) {
		var data, expected, mStream, SCALAR = 10;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 10,20,30,40,50 ];

		// Create a new scalar multiplication stream:
		mStream = multStream()
			.scalar( SCALAR )
			.stream();

		// Mock reading from the stream:
		utils.readStream( mStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, mStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});