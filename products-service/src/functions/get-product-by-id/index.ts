import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.getProductById`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{id}',
                cors: true,
            }
        },
    ],
};
