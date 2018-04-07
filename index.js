'use strict';

exports.handler = (event, context, callback) => {
    let t = 5;
    t = t + 1;
    callback(null, {
        statusCode: 200,
        body: t
    });
};