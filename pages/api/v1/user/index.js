import { createRouter } from "next-connect";
import controller from "infra/controller";
import session from "models/session";
import user from "models/user";
import authorization from "models/authorization";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:session"), getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const sessionToken = request.cookies.session_id;

  const sessionObject = await session.findOneValidByToken(sessionToken);
  const renewedSessionObject = await session.renew(sessionObject.id);
  await controller.setSessionCookie(renewedSessionObject.token, response);

  const userFound = await user.findOneById(sessionObject.user_id);

  if (!authorization.can(userFound, "read:session")) {
    throw new ForbiddenError({
      message: "O usuário não está ativado.",
      action: "Contate o suporte caso você acha que isso é um problema.",
    });
  }

  response.setHeader(
    "Cache-Control",
    "no-store, no-cache, max-age=0, must-revalidate",
  );
  return response.status(200).json(userFound);
}
