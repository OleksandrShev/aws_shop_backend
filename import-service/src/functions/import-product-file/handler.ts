import "source-map-support/register";

import {
  LambdaResponseBuilder,
  checkResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import * as AWS from "aws-sdk";
import {ConfigEnum} from "@libs/enum/config.enum";

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = (event) =>
    checkResponse(async () => {
      const BucketName = ConfigEnum.BUCKET_NAME;
      const s3 = new AWS.S3({ region: ConfigEnum.REGION });
      const url = await s3.getSignedUrlPromise("putObject", {
        Bucket: BucketName,
        Key: `uploaded/${event.queryStringParameters.name}`,
        Expires: 60,
        ContentType: "text/csv",
      });

      return new LambdaResponseBuilder(url).build();
    });
