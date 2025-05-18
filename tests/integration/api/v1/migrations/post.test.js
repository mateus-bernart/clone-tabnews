import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const response1Body = await response1.json();

  expect(process.env.NODE_ENV).toBe("test");
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  expect(response1.status).toBe(201);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const response2Body = await response2.json();

  expect(process.env.NODE_ENV).toBe("test");
  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);

  expect(response2.status).toBe(200);
});
