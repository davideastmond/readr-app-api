import express from "express";
import {
  getUser,
  jwtVerifyMiddleWare,
} from "../auth/controllers/jwt-middleware";
import { validateAPIKey } from "../auth/validate-api-key";
import { getPageSizeValidator } from "../common/validators/validators";
import { validateRouteRequest } from "../validate-route-request/validate-route-request";
import {
  deleteAllBookmarks,
  deleteBookmark,
  deleteTopic,
} from "./controllers/user.controller.delete";
import { getFeed, getUserEmail } from "./controllers/user.controller.get";
import { patchUserSources } from "./controllers/user.controller.patch";
import {
  addBookmark,
  putTopics,
  putUpdatePasswordData,
} from "./controllers/user.controller.put";
import {
  deleteFavoriteArticleValidator,
  patchNewsSourcesValidator,
  putBookmarkValidator,
  putUpdatePasswordValidator,
  topicValidator,
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
  putBookmarkValidator(),
  validateRouteRequest,
  getUser,
  addBookmark
);

// Delete an article. // Implement an all flag
router.delete(
  "/bookmark",
  validateAPIKey,
  jwtVerifyMiddleWare,
  deleteFavoriteArticleValidator(),
  validateRouteRequest,
  getUser,
  deleteBookmark
);

router.delete(
  "/bookmark/all",
  validateAPIKey,
  jwtVerifyMiddleWare,
  validateRouteRequest,
  getUser,
  deleteAllBookmarks
);

// Add a single topic string
router.put(
  "/topic",
  validateAPIKey,
  jwtVerifyMiddleWare,
  topicValidator(),
  validateRouteRequest,
  getUser,
  putTopics
);

// Secure update user password
router.put(
  "/password",
  validateAPIKey,
  jwtVerifyMiddleWare,
  putUpdatePasswordValidator(),
  validateRouteRequest,
  getUser,
  putUpdatePasswordData
);

// Delete a topic, or if there is an
// "all" flag set to true, delete all of the user's topics
router.delete(
  "/topic",
  validateAPIKey,
  jwtVerifyMiddleWare,
  topicValidator(),
  validateRouteRequest,
  getUser,
  deleteTopic
);

router.get(
  "/email",
  validateAPIKey,
  jwtVerifyMiddleWare,
  getUser,
  getUserEmail
);

router.patch(
  "/source",
  validateAPIKey,
  jwtVerifyMiddleWare,
  patchNewsSourcesValidator(),
  validateRouteRequest,
  getUser,
  patchUserSources
);
// Get articles from newsApi based user's topics
router.get(
  "/feed",
  validateAPIKey,
  jwtVerifyMiddleWare,
  getPageSizeValidator(),
  validateRouteRequest,
  getUser,
  getFeed
);
export default router;
