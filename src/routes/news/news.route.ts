import * as express from "express";
import { validateAPIKey } from "../auth/validate-api-key";
import { getHeadlines } from "./controllers/news.controller.get";
const router = express.Router();

router.get("/headlines", validateAPIKey, getHeadlines);

export default router;
