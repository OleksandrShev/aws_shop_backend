import type { AWS } from '@serverless/typescript';

import {getProductById, getProductsList, createProduct, fillTables, testFunc} from "@functions/index";
import { resources } from "./src/resources";

const serverlessConfiguration: AWS = {
  service: 'aws-shop-backend',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-openapi-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: process.env.PRODUCTS_TABLE,
      STOCK_TABLE: process.env.STOCK_TABLE,
    },

    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
              'dynamodb:BatchWriteItem',
              'dynamodb:ListTables',
              'dynamodb:DescribeTable'
            ],
            Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/*',
          }
        ]
      }
    }
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct, fillTables, testFunc },
  resources,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    }
  },
};

module.exports = serverlessConfiguration;
