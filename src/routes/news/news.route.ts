import * as express from "express";
import { validateAPIKey } from "../auth/validate-api-key";
import {
  getHeadlines,
  getNewsSources,
} from "./controllers/news.controller.get";
const router = express.Router();

router.get("/headlines", validateAPIKey, getHeadlines);
router.get("/sources", validateAPIKey, getNewsSources);
export default router;
