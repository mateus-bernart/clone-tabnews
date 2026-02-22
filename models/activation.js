import email from "infra/email";

async function sendEmailToUser(user) {
  await email.send({
    from: "FinTab<contato@fintab.com.br>",
    to: user.email,
    subject: "Ative seu cadastro!",
    text: `${user.username}, clique no link abaixo para ativar seu cadastro FinTab.

https://....

Atenciosamente,
Equipe FinTab.
    `,
  });
}

const activation = {
  sendEmailToUser,
};

export default activation;
