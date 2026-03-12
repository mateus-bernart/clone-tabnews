import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user";
import activation from "models/activation";
import { ForbiddenError } from "infra/errors";
import authorization from "models/authorization";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.post(controller.canRequest("create:user"), postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;
  const newUser = await user.create(userInputValues);

  const userTryingToCreate = {
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    features: request.body.features,
  };

  if (!authorization.can(userTryingToCreate, "create:user")) {
    throw new ForbiddenError({
      message: "Você não possui permissão para fazer login.",
      action: "Contate o suporte caso você acredite que isto seja um erro.",
    });
  }

  const activationToken = await activation.create(newUser.id);
  await activation.sendEmailToUser(newUser, activationToken);

  return response.status(201).json(newUser);
}
