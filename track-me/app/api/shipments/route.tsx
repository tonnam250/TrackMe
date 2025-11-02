import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.carrier) {
            return NextResponse.json({ message: "Missing required field: carrier" }, { status: 400 });
        }

        const shipment = {
            id: uuidv4(),
            carrier: body.carrier,
            status: body.status || "Pending",
            trackingId: body.trackingId || uuidv4(),
            currentLocation: body.currentLocation || "Bangkok, Thailand",
            sentTime: new Date().toISOString(), // เวลาเริ่มต้น
            lastUpdate: new Date().toISOString(), // เวลาสำหรับการอัพเดตล่าสุด
        };

        await ddbDocClient.send(
            new PutCommand({
                TableName: "Shipments",
                Item: shipment,
            })
        );

        return NextResponse.json({ message: "Shipment created", shipment }, { status: 201 });
    } catch (err) {
        console.error("Create Shipment Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const data = await ddbDocClient.send(
            new ScanCommand({ TableName: "Shipments" })
        );

        // จัดเรียงตาม lastUpdate ล่าสุดก่อน
        const shipments = (data.Items || []).sort((a, b) => {
            return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
        });

        return NextResponse.json({ shipments }, { status: 200 });
    } catch (err) {
        console.error("Fetch Shipments Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
