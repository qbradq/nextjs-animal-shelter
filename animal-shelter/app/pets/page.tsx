import { Pet } from "@/app/data";
import Image from "next/image";
import Link from "next/link";

export default async function PetsPage() {
  const res = await fetch(process.env.HOST + "/api/pets");
  const pets = await res.json();
  return (
    <>
      <div className="page-title">Pets for Adoption</div>
      {pets.map((pet: Pet) => (
        <Link key={pet.uuid} href={"/pets/" + pet.uuid}>
          <div
            key={pet.uuid}
            className="w-fit border-black border-2 rounded-sm m-2"
          >
            <div className="text-2xl font-bold text-center bg-blue-300 border-black border-b-2">
              {pet.name}
            </div>
            <Image
              src={"/" + pet.image}
              alt={pet.name}
              width={384}
              height={384}
            />
          </div>
        </Link>
      ))}
    </>
  );
}
