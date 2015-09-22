#!/usr/bin/env node

var AWS = require( '..' );
var sup = new AWS.Support( { region : 'us-east-1' } );

sup.describeCases().then( console.log );
