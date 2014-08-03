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
		this._exponent = 1;
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: factor( value )
	*	Setter and getter for multiplication factor. If a value is provided, sets the factor. If no value is provided, returns the factor.
	*
	* @param {Number} value - factor
	* @returns {Stream|Number} Stream instance or factor
	*/
	Stream.prototype.factor = function( value ) {
		if ( !arguments.length ) {
			return this._factor;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new Error( 'factor()::invalid input argument. Multiplication factor must be numeric.' );
		}
		this._factor = value;
		return this;
	}; // end METHOD factor()

	/**
	* METHOD: stream()
	*	Returns a through stream for performing scalar multiplication.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2({'objectMode': true}, onData( this._factor ) );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();