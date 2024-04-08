import {errorJSONResponse, ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {successJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {v4 as uuidv4} from 'uuid';
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {dynamoDB} from "../../dynamodb";
import {CreateProductBodySchema} from "../../schemas/createProduct.schema";
import {AvailableProduct} from "../../models/product";


const createNewProduct: ValidatedEventAPIGatewayProxyEvent<AvailableProduct> = async (event) => {
    const {error, value} = CreateProductBodySchema.validate(event.body)

    if (error) {
        return errorJSONResponse(error.details.map((err) => err.message).join(', '), 500)
    }

    const {count = 0, ...product} = value
    const id = uuidv4();

    const createProductCommand = new PutCommand({
        TableName: process.env.PRODUCTS_TABLE,
        Item: {
            id,
            ...product,
        },
    });
    const createStockCommand = new PutCommand({
        TableName: process.env.STOCK_TABLE,
        Item: {
            id,
            count,
        },
    });
    await dynamoDB.send(createProductCommand);
    await dynamoDB.send(createStockCommand);

    return successJSONResponse({id, count, ...product});

};

export const createProduct = middyfy(createNewProduct);
