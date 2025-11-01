import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN!,
  },
});

console.log("AWS Region:", process.env.AWS_REGION);
console.log("AWS Access Key:", process.env.AWS_ACCESS_KEY_ID ? "OK" : "Missing");
console.log("AWS Secret Key:", process.env.AWS_SECRET_ACCESS_KEY ? "OK" : "Missing");
console.log("AWS Session Token:", process.env.AWS_SESSION_TOKEN ? "OK" : "Missing");

export const ddbDocClient = DynamoDBDocumentClient.from(client);