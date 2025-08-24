import PetDetails from "@/app/components/PetDetails";
import { dbConnect } from "@/app/db";
import { Params } from "next/dist/server/request/params";
import { Pet } from "@/app/data";
import { Collection } from "mongodb";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/material/Alert";

export const dynamic = "force-dynamic";

export default async function PetPage({ params }: { params: Params }) {
  const { id } = await params;
  const { db } = await dbConnect();
  const pets: Collection<Pet> = db.collection<Pet>("pets");
  const pet: Pet | null = await pets.findOne({ uuid: id });
  if (!pet) {
    return (
      <Alert severity="error" icon={<ErrorIcon fontSize="large" />}>
        Pet not found.
      </Alert>
    );
  }
  return (
    <PetDetails
      pet={{
        uuid: pet.uuid,
        name: pet.name,
        image: pet.image,
        description: pet.description,
      }}
    />
  );
}
