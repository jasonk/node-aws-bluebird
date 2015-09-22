#!/usr/bin/env node

var AWS = require( '..' );
var ec2 = new AWS.EC2( { region : 'us-east-1' } );

ec2.describeInstances().then( function( data ) {
    return data.Reservations;
} ).map( function( reservation ) {
    return reservation.Instances;
} ).map( function( instance ) {
    console.log( instance );
} );
