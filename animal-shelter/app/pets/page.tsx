import { Pet } from "@/app/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PetsPage() {
  const res = await fetch(process.env.HOST + "/api/pets");
  const pets = await res.json();
  return (
    <>
      <div className="page-title">Pets for Adoption</div>
      <div className="flex flex-col flex- items-center">
        {pets.map((pet: Pet) => (
          <Link key={pet.uuid} href={"/pets/" + pet.uuid}>
            <div
              key={pet.uuid}
              className="w-sm md:w-2xl border-black border-2 rounded-sm my-1"
            >
              <div className="text-2xl font-bold text-center bg-blue-300 border-black border-b-2">
                {pet.name}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={process.env.CLOUDFRONT_URL + "/" + pet.image}
                alt={pet.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
