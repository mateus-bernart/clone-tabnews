import email from "infra/email";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Mateus <mateus@gmail.com.br>",
      to: "<mateusbernart@gmail.com.br>",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<mateus@gmail.com.br>");
    expect(lastEmail.recipients[0]).toBe("<mateusbernart@gmail.com.br>");
    expect(lastEmail.subject).toBe("Teste de assunto");
    expect(lastEmail.text).toBe("Teste de corpo\n");
  });
});
