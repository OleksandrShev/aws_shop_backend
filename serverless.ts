import type { AWS } from '@serverless/typescript';

import {getProductById, getProductsList} from "@functions/index";

const serverlessConfiguration: AWS = {
  service: 'aws-shop-backend',
  frameworkVersion: '3',
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
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductById },
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
    },
  },
};

module.exports = serverlessConfiguration;