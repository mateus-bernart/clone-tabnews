import { Client } from "pg";
async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
    // eslint-disable-next-line
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      await client.end().catch((err) => {
        console.error("Error closing the connection", err);
      });
    }
  }
}

export const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });
  await client.connect();
  return client;
};

const database = { query, getNewClient };
export default database;
