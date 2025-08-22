import { Pet } from "@/app/data";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";

export default async function PetPage({params}: {params: Params}) {
    const {id} = await params
    const res = await fetch(`${process.env.HOST}/api/pets/${id}`)
    const pet: Pet = await res.json()
    return (<>
        <div className="page-title">{pet.name}</div>
        <div className="flex flex-col md:flex-row">
            <Image src={"/"+pet.image} alt={"Photo of "+pet.name} width={600}
                height={600} className="pb-4 pr-0 md:pr-4" />
            <div>
                <p className="pb-4" >{pet.description}</p>
                <div className="flex flex-col items-center pb-4">
                    <button className="btn btn-blue">Adopt Me!</button>
                </div>
            </div>
        </div>
    </>)
}
