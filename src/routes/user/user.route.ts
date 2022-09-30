import express from "express";
import {
  getUser,
  jwtVerifyMiddleWare,
} from "../auth/controllers/jwt-middleware";
import { validateAPIKey } from "../auth/validate-api-key";
import { validateRouteRequest } from "../validate-route-request/validate-route-request";
import { deleteFavorite } from "./controllers/user.controller.delete";
import { addFavorite } from "./controllers/user.controller.put";
import {
  deleteFavoriteArticleValidator,
  putFavoriteArticleValidator,
} from "./validators/user.validators";

const router = express.Router();

/**
 * This route handles personal details like preferred sources
 * and topics and saved (favorite) articles
 */

// An an article to favorite list
router.put(
  "/bookmark",
  validateAPIKey,
  jwtVerifyMiddleWare,
  putFavoriteArticleValidator(),
  validateRouteRequest,
  getUser,
  addFavorite
);

// Delete an article
router.delete(
  "/bookmark",
  validateAPIKey,
  jwtVerifyMiddleWare,
  deleteFavoriteArticleValidator(),
  validateRouteRequest,
  getUser,
  deleteFavorite
);

// Get saved topics
router.get("/topics", validateAPIKey, jwtVerifyMiddleWare);
export default router;
