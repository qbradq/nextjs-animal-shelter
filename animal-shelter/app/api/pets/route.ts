import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../db";
import { Pet } from "@/app/data";
import { s3Image } from "../s3";

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

export async function POST(req: NextRequest) {
  // Collect request data
  const body = await req.json();
  const { name, description, image } = body;
  const uuid = crypto.randomUUID();
  const pet: Pet = {
    uuid,
    name,
    description,
    image: uuid + ".jpg",
  };
  // Convert data
  const buf = Buffer.from(image.split(",")[1], "base64");
  // Upload image to s3
  await s3Image(pet.uuid, buf);
  // Store cat document
  const { db } = await dbConnect();
  await db
    .collection("pets")
    .updateOne({ uuid }, { $set: pet }, { upsert: true });
  return NextResponse.json({ uuid }, { status: 201 });
}
