import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import {importFileParser, importProductsFile} from "@functions/index";

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
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
      BUCKET_NAME: process.env.BUCKET_NAME,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              's3:*',
              's3-object-lambda:*'
            ],
            Resource: 'arn:aws:s3:::my-bucket-alex-epam/*',
          }
        ]
      }
    }
  },
  // import the function via paths
  functions: { hello, importFileParser, importProductsFile },
  resources: {
    Resources: {
      ImportS3Bucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: 'my-bucket-alex-epam',
          VersioningConfiguration: {
            Status: 'Enabled'
          },
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedOrigins: ["*"],
                AllowedHeaders: ["*"],
                AllowedMethods: ["GET", "PUT", "HEAD"],
              },
            ],
          }
        },
      },
    }
  },
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
