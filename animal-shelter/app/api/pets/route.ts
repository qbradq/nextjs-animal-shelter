import { dbConnect } from "../db";

export async function GET() {
  const { db } = await dbConnect();
  const pets = await db.collection("pets").find({}).toArray();
  return new Response(JSON.stringify(pets), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
