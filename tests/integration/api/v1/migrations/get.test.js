import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response1.status).toBe(200);

      const response1Body = await response1.json();

      expect(Array.isArray(response1Body)).toBe(true);
      expect(response1Body.length).toBeGreaterThan(0);
    });
  });
});
