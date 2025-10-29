import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export async function GET() {
  try {
    const params = {
      TableName: "Users",
    };

    const result = await ddbDocClient.send(new ScanCommand(params));

    //Exported data exclude password
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
