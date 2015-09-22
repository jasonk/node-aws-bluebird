node-aws-bluebird
=================

[![Build Status][tb]][tl] [![Coverage Status][cb]][cl]

Promises support (with bluebird) for the AWS SDK for Node.js

The [AWS SDK for Node][aws-sdk] is very useful, but it is extremely callback
heavy.  This library binds a [Bluebird][bluebird] promise to the AWS.Request
object that is returned by most of the AWS SDK methods.  This means that
instead of doing this every time:

```node
var AWS = require( 'aws' );
var ec2 = new AWS.EC2( {} );
ec2.describeInstances( {}, function( err, data ) {
    if ( err ) {
        console.log( err );
    } else {
        console.log( data );
    }
} );
```

You can use a very nice Promise syntax instead:

```node
var AWS = require( 'aws-bluebird' );
var ec2 = new AWS.EC2( {} );
ec2.describeInstances( {} ).then( function( data ) {
    console.log( data );
} );
```

If you just want to get a promise from the returned object, you can just
call .promise on it:

```node
var promise = ec2.describeInstances().promise();
```

This .promise method is most of what this library does, however the returned
object also has a bunch of helper functions, which promisify the result for
you and then call that method on the returned promise.  So you can use any
of these methods from the [Bluebird API][bluebird-api]:

 * then
 * spread
 * catch
 * error
 * finally
 * bind
 * isFulfilled
 * isRejected
 * isPending
 * value
 * reason
 * all
 * props
 * settle
 * any
 * race
 * some
 * map
 * reduce
 * filter
 * each
 * nodeify
 * asCallback
 * delay
 * timeout
 * tap
 * call
 * get
 * return
 * throw
 * reflect
 * done



[aws-sdk]: https://aws.amazon.com/sdk-for-node-js/
[bluebird]: https://github.com/petkaantonov/bluebird
[bluebird-api]: https://github.com/petkaantonov/bluebird/blob/master/API.md

[tb]: https://travis-ci.org/jasonk/node-aws-bluebird.svg?branch=master
[tl]: https://travis-ci.org/jasonk/node-aws-bluebird
[cb]: https://coveralls.io/repos/jasonk/node-aws-bluebird/badge.svg?branch=master&service=github
[cl]: https://coveralls.io/github/jasonk/node-aws-bluebird?branch=master
