import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.trackingId || !body.status || !body.location) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const event = {
            trackingId: body.trackingId,
            eventTime: new Date().toISOString(), // SK
            status: body.status,
            location: body.location,
            message: body.message || "",
        };

        await ddbDocClient.send(
            new PutCommand({ TableName: "TrackingEvents", Item: event })
        );

        return NextResponse.json({ message: "Tracking event saved", event }, { status: 201 });
    } catch (err) {
        console.error("Create TrackingEvent Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
