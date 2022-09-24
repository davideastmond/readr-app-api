import * as express from "express";
import { validateAPIKey } from "../auth/validate-api-key";
import { validateRouteRequest } from "../validate-route-request/validate-route-request";
import {
  processUserRegistration,
  authenticateEmailPassword,
  generateToken,
} from "./controllers/auth.controller.post";
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
export default router;
