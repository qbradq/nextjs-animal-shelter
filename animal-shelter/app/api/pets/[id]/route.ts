import { NextRequest } from "next/server";
import { dbConnect } from "../../../db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { db } = await dbConnect();
  const pet = await db.collection("pets").findOne({ uuid: id });
  if (!pet) {
    return new Response("Pet not found!", {
      status: 404,
    });
  }
  return new Response(JSON.stringify(pet), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
