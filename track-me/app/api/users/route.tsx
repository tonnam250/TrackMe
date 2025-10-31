import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// POST: เพิ่ม user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST /api/users body:", body);

    if (!body.username || !body.password || !body.first_name || !body.last_name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const params = {
      TableName: "Users",
      Item: {
        id: uuidv4(),
        username: body.username,
        password: passwordHash,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        role: body.role,
        createdAt: new Date().toISOString(),
      },
    };

    await ddbDocClient.send(new PutCommand(params));

    return NextResponse.json({ message: "User added successfully", userId: params.Item.id }, { status: 201 });
  } catch (err) {
    console.error("Add User Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: ดึง user ทั้งหมด (ยกเว้น password)
export async function GET() {
  try {
    const params = { TableName: "Users" };
    const result = await ddbDocClient.send(new ScanCommand(params));

    const users = result.Items?.map((user: any) => {
      const { password, ...noPasswordRes } = user;
      return noPasswordRes;
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
  }
}
