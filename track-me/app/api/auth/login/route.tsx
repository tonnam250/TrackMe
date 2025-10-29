import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
    }

    const params = { TableName: "Users" };
    const result = await ddbDocClient.send(new ScanCommand(params));

    const user = result.Items?.find((u: any) => u.username === username);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // auth with JWT
    // const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!);

    return NextResponse.json({
      message: "Login successful",
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Error during login", error }, { status: 500 });
  }
}
