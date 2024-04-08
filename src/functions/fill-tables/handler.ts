import {errorJSONResponse, successJSONResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/api-gateway";
import products from "../../mocks/products.json"
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {dynamoDB} from "../../dynamodb";
import {middyfy} from "@libs/lambda";
const fillTablesFunc: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
    try {
        for (const product of products) {
            const putProductCommand = new PutCommand({
                TableName: process.env.PRODUCTS_TABLE,
                Item: product,
            });
            const putStockCommand = new PutCommand({
                TableName: process.env.STOCK_TABLE,
                Item: {
                    id: product.id,
                    count: Math.floor(Math.random() * 20) + 1,
                }
            });
            await dynamoDB.send(putProductCommand);
            await dynamoDB.send(putStockCommand);
        }
        return successJSONResponse({ message: 'Tables filled successfully!' });
    } catch (error) {
        console.error("Error filling tables:", error);
        return errorJSONResponse("Error filling tables", 500);
    }
};

export const fillTables = middyfy(fillTablesFunc);
