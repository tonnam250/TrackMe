import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { GetCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(req: Request, { params }: { params: { shipmentId: string } }) {
    try {
        const { shipmentId } = await params;

        if (!shipmentId) {
            return NextResponse.json({ message: "Missing shipmentId" }, { status: 400 });
        }

        const result = await ddbDocClient.send(
            new GetCommand({
                TableName: "Shipments",
                Key: { id: shipmentId }, // PK
            })
        );

        if (!result.Item) {
            return NextResponse.json({ message: "Shipment not found" }, { status: 404 });
        }

        return NextResponse.json({ shipment: result.Item }, { status: 200 });
    } catch (err) {
        console.error("Get Shipment Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { shipmentId: string } }
) {
    try {
        const { shipmentId } = params;
        if (!shipmentId) {
            return NextResponse.json({ message: "Missing shipmentId" }, { status: 400 });
        }

        await ddbDocClient.send(
            new DeleteCommand({
                TableName: "Shipments",
                Key: { id: shipmentId }, // PK
            })
        );

        return NextResponse.json({ message: "Shipment deleted" }, { status: 200 });
    } catch (err) {
        console.error("Delete Shipment Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { shipmentId: string } }) {
    try {
        const { shipmentId } = params;
        if (!shipmentId) {
            return NextResponse.json({ message: "Missing shipmentId" }, { status: 400 });
        }

        const body = await req.json();
        const { status, currentLocation } = body;

        if (!status && !currentLocation) {
            return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
        }

        // สร้าง Expression สำหรับอัปเดต DynamoDB
        let updateExpression = "set";
        const ExpressionAttributeNames: any = {};
        const ExpressionAttributeValues: any = {};

        if (status) {
            updateExpression += " #status = :status,";
            ExpressionAttributeNames["#status"] = "status";
            ExpressionAttributeValues[":status"] = status;
        }
        if (currentLocation) {
            updateExpression += " #loc = :loc,";
            ExpressionAttributeNames["#loc"] = "currentLocation";
            ExpressionAttributeValues[":loc"] = currentLocation;
        }

        // ลบ comma สุดท้าย
        updateExpression = updateExpression.replace(/,$/, "");

        const result = await ddbDocClient.send(
            new UpdateCommand({
                TableName: "Shipments",
                Key: { id: shipmentId },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames,
                ExpressionAttributeValues,
                ReturnValues: "ALL_NEW",
            })
        );

        return NextResponse.json({ message: "Shipment updated", shipment: result.Attributes }, { status: 200 });
    } catch (err) {
        console.error("Update Shipment Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
