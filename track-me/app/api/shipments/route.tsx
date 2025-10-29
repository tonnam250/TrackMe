import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import {
    PutCommand,
    ScanCommand,
    QueryCommand,
    UpdateCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// Create shipment
export async function POST(req: Request) {
    const body = await req.json();
    const shipment = {
        id: uuidv4(),
        userId: body.userId,
        description: body.description,
        status: body.status || "pending",
        origin: body.origin,
        destination: body.destination,
        currentLocation: body.origin,
        createdAt: new Date().toISOString(),
    };

    try {
        await ddbDocClient.send(new PutCommand({ TableName: "Shipments", Item: shipment }));
        return NextResponse.json({ message: "Shipment created", shipment });
    } catch (error) {
        return NextResponse.json({ message: "Error creating shipment", error }, { status: 500 });
    }
}

// GET Shipments, Filter by userId
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    try {
        let result;
        if (userId) {
            // Use GSI userId-index
            result = await ddbDocClient.send(
                new QueryCommand({
                    TableName: "Shipments",
                    IndexName: "userId-index",
                    KeyConditionExpression: "userId = :uid",
                    ExpressionAttributeValues: { ":uid": userId },
                })
            );
        } else {
            // Get all shipments
            result = await ddbDocClient.send(new ScanCommand({ TableName: "Shipments" }));
        }

        return NextResponse.json({ shipments: result.Items ?? [] });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching shipments", error }, { status: 500 });
    }
}

// PATCH → อัปเดต shipment fields ที่ต่อยอดได้ง่าย
export async function PATCH(req: Request, { params }: { params: { shipmentId: string } }) {
    const body = await req.json();

    const updateParams = {
        TableName: "Shipments",
        Key: { id: params.shipmentId },
        UpdateExpression: "set #status = :status, currentLocation = :loc",
        ExpressionAttributeNames: {
            "#status": "status",
        },
        ExpressionAttributeValues: {
            ":status": body.status,
            ":loc": body.currentLocation,
        },
        ReturnValues: "ALL_NEW" as const,
    };

    try {
        const result = await ddbDocClient.send(new UpdateCommand(updateParams));
        return NextResponse.json({ message: "Shipment updated", shipment: result.Attributes });
    } catch (error) {
        return NextResponse.json({ message: "Error updating shipment", error }, { status: 500 });
    }
}

// DELETE → ลบ shipment
export async function DELETE(req: Request, { params }: { params: { shipmentId: string } }) {
    try {
        await ddbDocClient.send(new DeleteCommand({ TableName: "Shipments", Key: { id: params.shipmentId } }));
        return NextResponse.json({ message: "Shipment deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting shipment", error }, { status: 500 });
    }
}
