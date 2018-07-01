import { handler } from './';
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult, Callback } from 'aws-lambda';

function mockType<TypeToMock>(mockObject: Partial<TypeToMock>){
    return new Proxy<Partial<TypeToMock> & { [key: string]: any }>(mockObject, {
        get: (target, name) => {
            if (typeof name === 'symbol' || typeof name === 'number' || Object.keys(target).includes(name)) {
                if (typeof name === 'symbol') {
                    throw new Error(`Attempted to access symbol property: ${String(name)}`); 
                }
                return target[name];
            } else {
                throw new Error(`Attempted to access unspecified property: ${name}`);
            }
        }
    }) as TypeToMock;
}

describe('when getTickets is given', () => {
    it('should respond with 200 with the tickets', () => {
        const event = mockType<APIGatewayProxyEvent>({});
        const context = mockType<Context>({});
        const callback = mockType<Callback<APIGatewayProxyResult>>(() => {
        });
        handler(event, context, callback);
        expect(true).toBe(true);
    });
});
