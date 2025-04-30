import database from "infra/database.js";

const databaseName = process.env.POSTGRES_DB;
const query = `
  SELECT version() AS postgres_version, current_setting('max_connections')::int AS max_connections, count(*) AS opened_connections 
  FROM pg_stat_activity 
  WHERE datname = $1`;

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgres_info = {};

  const result_query = await database.query({
    text: query,
    values: [databaseName],
  });

  result_query.rows.forEach((row) => {
    postgres_info.postgres_version = row.postgres_version;
    postgres_info.max_connections = row.max_connections;
    postgres_info.opened_connections = parseInt(row.opened_connections[0]);
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: postgres_info,
    },
  });
}

export default status;
