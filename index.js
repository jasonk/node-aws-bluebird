var Bluebird = require( 'bluebird' );
module.exports = require( 'aws-sdk' );

var proto = module.exports.Request.prototype;

proto.promise = function() {
    var self = this;
    return new Bluebird( function( resolve, reject ) {
        self.on( 'complete', function( response ) {
            if ( response.error ) {
                reject( response.error );
            } else {
                resolve( response.data );
            }
        } );
        self.send();
    } );
};

[
    // CORE
    'then', 'spread', 'catch', 'error', 'finally', 'bind',
    // The PromiseInspection Interface
    'isFulfilled', 'isRejected', 'isPending', 'value', 'reason',
    // Collections
    'all', 'props', 'settle', 'any', 'race', 'some', 'map', 'reduce',
    'filter', 'each',
    // Promisification
    'nodeify', 'asCallback',
    // Timers
    'delay', 'timeout',
    // Utility
    'tap', 'call', 'get', 'return', 'throw', 'reflect',
    // Error management
    'done'
].forEach( function( fn ) {
    /*
    if ( proto[ fn ] !== undefined ) {
        console.error( "AWS.Request already has " + fn );
    }
    */
    proto[ fn ] = function() {
        var p = this.promise();
        return p[ fn ].apply( p, arguments );
    };
} );
