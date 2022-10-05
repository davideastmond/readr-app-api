import * as express from "express";
import { validateAPIKey } from "../auth/validate-api-key";
import { validateRouteRequest } from "../validate-route-request/validate-route-request";
import {
  processUserRegistration,
  authenticateEmailPassword,
  generateToken,
} from "./controllers/auth.controller.post";
import { confirmSession } from "./controllers/auth.get.controller";
import { getUser, jwtVerifyMiddleWare } from "./controllers/jwt-middleware";
import {
  emailPasswordValidator,
  registrationValidator,
} from "./validators/auth.validators";

const router = express.Router();

router.post(
  "/register",
  validateAPIKey,
  registrationValidator(),
  validateRouteRequest,
  processUserRegistration
);
router.post(
  "/login",
  validateAPIKey,
  emailPasswordValidator(),
  validateRouteRequest,
  authenticateEmailPassword,
  generateToken
);

router.post(
  "/logout",
  validateAPIKey,
  jwtVerifyMiddleWare,
  (req: express.Request, res: express.Response) => {
    res.status(200).send({ response: "OK" });
  }
);

// This just checks that a token contains a valid session. Sends user object
router.get(
  "/session",
  validateAPIKey,
  jwtVerifyMiddleWare,
  getUser,
  confirmSession
);
export default router;
