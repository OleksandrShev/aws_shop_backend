import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import products from "../../mocks/products.json"

const getProducts: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
    return formatJSONResponse({
        products
    });
};

export const getProductsList = middyfy(getProducts);
