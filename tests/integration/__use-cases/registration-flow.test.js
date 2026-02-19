import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: Registration Flow (all successful)", () => {
  test("Create user account", async () => {
    const createUserReponse = await fetch(
      "http://localhost:3000/api/v1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "RegistrationFlow",
          email: "registration.flow@curso.dev",
          password: "1234",
        }),
      },
    );

    expect(createUserReponse.status).toBe(201);

    const createdUserResponseBody = await createUserReponse.json();

    expect(createdUserResponseBody).toEqual({
      id: createdUserResponseBody.id,
      username: "RegistrationFlow",
      email: createdUserResponseBody.email,
      features: ["read:activation_token"],
      password: createdUserResponseBody.password,
      created_at: createdUserResponseBody.created_at,
      updated_at: createdUserResponseBody.updated_at,
    });
  });

  test("Receive email confirmation", () => {});
  test("Activate account", () => {});
  test("Login", () => {});
  test("Get user information", () => {});
});
