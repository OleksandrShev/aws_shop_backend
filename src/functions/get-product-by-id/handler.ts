import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import products from "../../mocks/products.json"

const getProduct: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const { id } = event.pathParameters;
    const product = (products as any).find((p) => p.id === id);

    return formatJSONResponse({
        product
    });
};

export const getProductById = middyfy(getProduct);
