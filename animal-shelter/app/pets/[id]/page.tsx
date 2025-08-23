import { Pet } from "@/app/data";
import { Params } from "next/dist/server/request/params";

export const dynamic = "force-dynamic";

export default async function PetPage({ params }: { params: Params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.HOST}/api/pets/${id}`);
  const pet: Pet = await res.json();
  return (
    <>
      <div className="page-title">{pet.name}</div>
      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={process.env.CLOUDFRONT_URL + "/" + pet.image}
          alt={"Photo of " + pet.name}
          className="w-sm md:w-3xl border-2 border-black border-r-0 rounded-lg"
        />
        <div className="w-full md:w-3/4">
          <p className="p-4">{pet.description}</p>
          <div className="flex flex-col items-center pb-4">
            <button className="btn btn-blue">Adopt Me!</button>
          </div>
        </div>
      </div>
    </>
  );
}
