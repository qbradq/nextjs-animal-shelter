import { NextRequest } from "next/server";
import { dbConnect } from "../../db";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = await params;
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
