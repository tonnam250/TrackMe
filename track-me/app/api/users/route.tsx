import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(req: Request) {
  const body = await req.json();

  const params = {
    TableName: "Users",
    Item: {
      userId: body.userId,
      email: body.email,
      passwordHash: body.passwordHash,
    },
  };

  await ddbDocClient.send(new PutCommand(params));

  return NextResponse.json({ message: "User created" });
}
