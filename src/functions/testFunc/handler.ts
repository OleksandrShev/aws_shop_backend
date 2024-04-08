import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {successJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';

const testF: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
    return successJSONResponse("test");
};

export const testFunc = middyfy(testF);
