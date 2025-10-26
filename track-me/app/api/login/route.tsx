import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/lib/dynamo"; // สมมติคุณ import client จากที่นี่

export async function POST(req: Request) {
  const formData = await req.json();

  const params = {
    TableName: "Users",
    IndexName: "username-index",
    KeyConditionExpression: "#username = :usernameValue",
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":usernameValue": formData.username,
    },
  };

  try {
    const result = await ddbDocClient.send(new QueryCommand(params));

    if (!result.Items || result.Items.length === 0) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const user = result.Items[0];
    // ตรวจสอบ password ตรงหรือไม่ (เช่น bcrypt.compare)
    // ถ้าผ่านก็ return token หรือข้อมูล user กลับไป
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("DynamoDB Query Error:", error);
    return Response.json({ message: "Login failed" }, { status: 500 });
  }
}
