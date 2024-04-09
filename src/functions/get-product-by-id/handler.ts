import {errorJSONResponse, successJSONResponse, ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
// import {middyfy} from '@libs/lambda';
import {GetCommand} from "@aws-sdk/lib-dynamodb";
import {AvailableProduct} from "../../models/product";
import {dynamoDB} from "../../dynamodb";

export const getProductById: ValidatedEventAPIGatewayProxyEvent<AvailableProduct> = async (event) => {
    const getProductCommand = new GetCommand({
        TableName: process.env.PRODUCTS_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    });
    const getCountCommand = new GetCommand({
        TableName: process.env.STOCK_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    });
    const {Item: product} = await dynamoDB.send(getProductCommand);
    const {Item: stock} = await dynamoDB.send(getCountCommand);
    if (!product) {
        return errorJSONResponse({message: `Product with ID ${event.pathParameters.id} not found`});
    }
    if (!stock) {
        return errorJSONResponse({message:'Information about count not found'});
    }

    return successJSONResponse({...product, ...stock});
};

// export const getProductById = middyfy(getProduct);
