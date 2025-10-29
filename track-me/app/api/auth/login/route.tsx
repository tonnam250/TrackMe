import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    console.log("Login attempt:", username);

    const params = {
      TableName: "Users",
      IndexName: "username-index", // ชื่อ GSI
      KeyConditionExpression: "username = :u",
      ExpressionAttributeValues: {
        ":u": username,
      },
      Limit: 1,
    };

    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log("Query result:", data);

    if (!data.Items || data.Items.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = data.Items[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
