import { load, Pool } from "./deps.ts";

const POOL_CONNECTIONS = 20;

const env = await load();
const PG_URL = env["PG_URL"];

if (!PG_URL) {
  console.error("PG_URL is required");
  Deno.exit(1);
}

const pool = new Pool(PG_URL, POOL_CONNECTIONS);

export async function query(
  text: string,
  params: (string | number | boolean | null)[],
) {
  const client = await pool.connect();
  try {
    return await client.queryObject(text, params);
  } finally {
    client.release();
  }
}
