
const dynamodb = {
    ProductsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: `products`,
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S"
                }
            ],
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
        }
    },
    StockTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: `stock`,
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S"
                }
            ],
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
        }
    }
}

export default dynamodb;
