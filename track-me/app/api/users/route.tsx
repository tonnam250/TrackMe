import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();

  const params = {
    TableName: "Users",
    Item: {
      id: uuidv4(),
      first_name: body.first_name,
      last_name: body.last_name,
      username: body.username,
      email: body.email,
      password: body.password,
      phone: body.phone,
      address: body.address,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    const result = await ddbDocClient.send(new PutCommand(params));
    console.log("DynamoDB result:", result);
    return NextResponse.json({ message: "User created", result });
  } catch (error) {
    console.error("DynamoDB error:", error);
    return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    if (!username || !password) {
      return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
    }

    // search user in DynamoDB
    const params = { TableName: "Users" };
    const result = await ddbDocClient.send(new ScanCommand(params));

    const user = result.Items?.find(
      (u: any) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user });
  } catch (error) {
    console.error("DynamoDB GET error:", error);
    return NextResponse.json({ message: "Error logging in", error }, { status: 500 });
  }
}
