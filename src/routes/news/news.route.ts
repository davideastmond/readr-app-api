import * as express from "express";
import { validateAPIKey } from "../auth/validate-api-key";
import { getPageSizeValidator } from "../common/validators/validators";
import { validateRouteRequest } from "../validate-route-request/validate-route-request";
import {
  getHeadlines,
  getNewsSources,
} from "./controllers/news.controller.get";
const router = express.Router();

router.get(
  "/headlines",
  validateAPIKey,
  getPageSizeValidator(),
  validateRouteRequest,
  getHeadlines
);
router.get("/sources", validateAPIKey, getNewsSources);
export default router;
