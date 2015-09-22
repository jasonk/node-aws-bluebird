#!/usr/bin/env node

var AWS = require( '..' );
var ec2 = new AWS.EC2( { region : 'us-west-1' } );

ec2.describeAccountAttributes().then( function( data ) {
    data.AccountAttributes.forEach( function( attr ) {
        var vals = [];
        attr.AttributeValues.forEach( function( val ) {
            vals.push( val.AttributeValue );
        } );
        console.log( "%s = %s", attr.AttributeName, vals.join( ', ' ) );
    } );
} );
