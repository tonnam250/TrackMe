import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { GetCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
  try {
    const result = await ddbDocClient.send(
      new GetCommand({
        TableName: "Users",
        Key: { id: params.userId },
      })
    );

    if (!result.Item) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete password before send res
    const { password, ...safeUser } = result.Item;

    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
  }
}

// Update some data function
export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
  try {
    const body = await req.json();
    
    // Create UpdateExpression for DynamoDB
    const updateParams = {
      TableName: "Users",
      Key: { id: params.userId },
      UpdateExpression: "set first_name = :first_name, last_name = :last_name, phone = :phone",
      ExpressionAttributeValues: {
        ":first_name": body.first_name,
        ":last_name": body.last_name,
        ":phone": body.phone,
      },
      ReturnValues: "ALL_NEW" as const,
    };

    const result = await ddbDocClient.send(new UpdateCommand(updateParams));
    const { password, ...noPassUser } = result.Attributes ?? {};

    return NextResponse.json({ message: "User updated", user: noPassUser });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user", error }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { userId: string } }) {
  try {
    const deleteParams = {
      TableName: "Users",
      Key: { id: params.userId },
    };

    await ddbDocClient.send(new DeleteCommand(deleteParams));

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
  }
}
