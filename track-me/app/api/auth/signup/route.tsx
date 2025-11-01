import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.username || !body.password || !body.email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const role = "USER";

    const params = {
      TableName: "Users",
      Item: {
        id: uuidv4(),
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        email: body.email,
        password: passwordHash,
        role,
        phone: body.phone,
        address: body.address,
        createdAt: new Date().toISOString(),
      },
    };

    await ddbDocClient.send(new PutCommand(params));

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Error during signup", error }, { status: 500 });
  }
}
