import { NextResponse } from "next/server";
import { ddbDocClient } from "@/lib/dynamo";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(req: Request, { params }: { params: { trackingId: string } }) {
    try {
        const { trackingId } = params;

        if (!trackingId) {
            return NextResponse.json({ message: "Missing trackingId" }, { status: 400 });
        }

        // Query ผ่าน GSI trackingId-index
        const result = await ddbDocClient.send(
            new QueryCommand({
                TableName: "Tracking",
                IndexName: "trackingId-index", // ✅ ใช้ GSI
                KeyConditionExpression: "trackingId = :trackingId",
                ExpressionAttributeValues: { ":trackingId": trackingId },
                ScanIndexForward: true, // เก่า → ใหม่
            })
        );

        if (!result.Items || result.Items.length === 0) {
            return NextResponse.json({ message: "Tracking not found" }, { status: 404 });
        }

        return NextResponse.json({ events: result.Items }, { status: 200 });
    } catch (err) {
        console.error("Get TrackingEvents Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
