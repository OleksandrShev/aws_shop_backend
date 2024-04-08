import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {successJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {GetCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";
import {dynamoDB} from "../../dynamodb";
import {AvailableProduct, Product} from "../../models/product";

const getProducts: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
    const getCommand = new ScanCommand({
        TableName: process.env.PRODUCTS_TABLE,
        ConsistentRead: true,
    });
    const {Items} = await dynamoDB.send(getCommand);

    const products: AvailableProduct[] = await Promise.all(Items.map(async (product: Product): Promise<AvailableProduct> => {
        const getCountCommand = new GetCommand({
            TableName: process.env.STOCK_TABLE,
            Key: {
                id: product.id
            }
        });
        const {Item: stock} = await dynamoDB.send(getCountCommand);
        return {...product, ...stock} as AvailableProduct;
    }))
    return successJSONResponse(products);
};

export const getProductsList = middyfy(getProducts);
