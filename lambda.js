'use strict';

exports.handler = (event, context, callback) => {
    let t = 9;
    t = t + 1;
    callback(null, {
        statusCode: 200,
        body: t
    });
};