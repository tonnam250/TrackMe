import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.carrier || !body.status) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const shipment = {
            id: uuidv4(),
            carrier: body.carrier,
            status: body.status,
            currentLocation: body.currentLocation || "",
            trackingId: body.trackingId || uuidv4(),
            sentTime: new Date().toISOString(),
        };

        await ddbDocClient.send(new PutCommand({ TableName: "Shipments", Item: shipment }));

        return NextResponse.json({ message: "Shipment created", shipment }, { status: 201 });
    } catch (err) {
        console.error("Create Shipment Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
