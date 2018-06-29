import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = (event, context, callback) => {
    let t = 24;
    t = t + 1;
    callback(null, {
        statusCode: 200,
        body: String(t)
    });
};
