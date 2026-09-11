import { drizzle } from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";


const databaseURL = process.env.DATABASE_URL;

const schema = {};

if(!databaseURL){
    throw new Error("DATABASE_URL is required for api ROUTES");
}
const sql = neon(databaseURL);

export const db = drizzle({ client:sql , schema});