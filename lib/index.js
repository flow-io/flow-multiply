/**
*
*	STREAM: multiply
*
*
*	DESCRIPTION:
*		- Transform stream factory to perform scalar multiplication on streamed numeric data values.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/08/01: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through2
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through2 module:
		through2 = require( 'through2' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData( factor )
	*	Returns a callback which performs scalar multiplication.
	*
	* @private
	* @param {Number} factor
	* @returns {Function} callback
	*/
	function onData( factor ) {
		/**
		* FUNCTION: onData( newVal, encoding, clbk )
		*	Data event handler. Performs scalar multiplication.
		*
		* @private
		* @param {Number} newVal - streamed data value
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after performing scalar multiplication. Function accepts two arguments: [ error, chunk ].
		*/
		return function onData( newVal, encoding, clbk ) {
			clbk( null, newVal*factor );
		}; // end FUNCTION onData()
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		this._scalar = 1;
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: scalar( value )
	*	Setter and getter for multiplication scalar. If a value is provided, sets the scalar. If no value is provided, returns the scalar.
	*
	* @param {Number} value - scalar
	* @returns {Stream|Number} Stream instance or scalar
	*/
	Stream.prototype.scalar = function( value ) {
		if ( !arguments.length ) {
			return this._scalar;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new Error( 'scalar()::invalid input argument. Multiplication scalar must be numeric.' );
		}
		this._scalar = value;
		return this;
	}; // end METHOD scalar()

	/**
	* METHOD: stream()
	*	Returns a through stream for performing scalar multiplication.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2({'objectMode': true}, onData( this._scalar ) );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();