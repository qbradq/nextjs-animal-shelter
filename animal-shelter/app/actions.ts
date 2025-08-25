"use server";
import { dbConnect } from "@/app/db";
import { s3Image, s3ImageRemove } from "@/app/s3";
import { Pet } from "./data";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { dataUriToBuffer } from "data-uri-to-buffer";

export async function insertPet(
  name: string,
  description: string,
  imgSrc: string,
) {
  // Construct pet record
  const uuid = randomUUID();
  const pet: Pet = {
    uuid,
    name,
    description,
    image: uuid + ".jpg",
  };
  // Upload to S3
  const ab = dataUriToBuffer(imgSrc);
  const buf = Buffer.from(ab.buffer);
  await s3Image(uuid, buf);
  // Store record
  const { db } = await dbConnect();
  await db
    .collection("pets")
    .updateOne({ uuid }, { $set: pet }, { upsert: true });
  // And send the user to the details page of the new record
  redirect("/pets/" + uuid);
}

export async function deletePet(id: string) {
  await s3ImageRemove(id);
  const { db } = await dbConnect();
  await db.collection("pets").deleteOne({ uuid: id });
}
