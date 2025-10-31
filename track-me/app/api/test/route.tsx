import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamoClient";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";

export async function GET() {
  try {
    const result = await ddbDocClient.send(new ListTablesCommand({}));
    return NextResponse.json({ tables: result.TableNames });
  } catch (err) {
    console.error("DynamoDB Error:", err);
    return NextResponse.json({ error: "Failed to connect DynamoDB" });
  }
}
