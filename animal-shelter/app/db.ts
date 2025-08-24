import { MongoClient, Db, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function dbConnect() {
  if (cachedClient && cachedDb) {
    return { cachedClient, db: cachedDb };
  }
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  cachedClient = client;
  cachedDb = client.db("animal-shelter");
  return { client, db: client.db("animal-shelter") };
}
