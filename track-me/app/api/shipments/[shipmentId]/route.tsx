import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

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
