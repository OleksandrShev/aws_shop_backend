import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.testFunc`,
    events: [
        {
            http: {
                method: 'get',
                path: 'test',
                cors: true
            }
        },
    ],
};
