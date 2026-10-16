import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI .env.local e nai");

// Dev e hot reload e bar bar connection na khule, ekta-i rakhi
const g = globalThis as unknown as { _mongo?: MongoClient };
export const client = g._mongo ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") g._mongo = client;

export const db = client.db();