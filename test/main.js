var chai = require( 'chai' ),
    should = chai.should(),
    expect = chai.expect;

chai.use( require( 'chai-as-promised' ) );

describe( 'aws-bluebird', function() {
    var AWS = require( '..' );

    var ec2 = new AWS.EC2( { region : 'us-west-1' } );

    var p = ec2.describeAccountAttributes();

    it( 'should produce a promise', function() {
        p.should.be.an( 'object' );
        p.should.be.an.instanceof( AWS.Request );
    } );

    describe( 'api', function() {
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
        ].forEach( function( method ) {
            it( 'should implement .' + method, function() {
                p.should.respondTo( method );
            } );
        } );
    } );
    it( 'should produce correct results', function() {
        return p.should.eventually.have.property( 'AccountAttributes' );
    } );
    it( 'should handle errors correctly', function() {
        return ec2.describeAccountAttributes( { DryRun : true } )
            .should.be.rejected;
    } );
    /*
    ec2.describeAccountAttributes().then( function( data ) {
        console.log( data );
    } );
    */

} );
