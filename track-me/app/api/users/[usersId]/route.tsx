import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { GetCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(_req: Request, { params }: { params: { usersId: string } }) {
  const userId = params.usersId; // ✅ ตรงกับชื่อ [usersId]

  if (!userId) {
    return NextResponse.json({ message: "Missing user id" }, { status: 400 });
  }

  try {
    const result = await ddbDocClient.send(
      new GetCommand({
        TableName: "Users",
        Key: { id: userId },
      })
    );

    if (!result.Item) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { password, ...safeUser } = result.Item;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
  }
}

// Update some data function
export async function PATCH(req: Request, { params }: { params: { usersId: string } }) {
  try {
    const body = await req.json();
    const userId = params.usersId;

    const updateParams = {
      TableName: "Users",
      Key: { id: userId },
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

export async function DELETE(_req: Request, { params }: { params: { usersId: string } }) {
  try {
    const userId = params.usersId;
    const deleteParams = {
      TableName: "Users",
      Key: { id: userId },
    };

    await ddbDocClient.send(new DeleteCommand(deleteParams));

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
  }
}

