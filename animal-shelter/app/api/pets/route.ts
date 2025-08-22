import { Pet } from "@/app/data"
import { dbConnect } from "../db"
import { NextRequest } from "next/server"
import { Params } from "next/dist/server/request/params"

export async function GET() {
    const { db } = await dbConnect()
    const pets = await db.collection("pets").find({}).toArray()
    return new Response(JSON.stringify(pets), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export async function POST(request: NextRequest, {params}: {params: Params}) {
    const {db} = await dbConnect()
    const body: Pet = await request.json()
    
}
