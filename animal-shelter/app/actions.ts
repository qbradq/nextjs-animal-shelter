"use server";
import { dbConnect } from "@/app/db";
import { s3ImageRemove } from "@/app/s3";

export async function deletePet(id: string) {
  await s3ImageRemove(id);
  const { db } = await dbConnect();
  await db.collection("pets").deleteOne({ uuid: id });
}
