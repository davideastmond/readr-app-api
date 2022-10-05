require("dotenv");
import { Request, Response, NextFunction } from "express";
import { IS_PRODUCTION } from "../../environment";

const API_KEY = IS_PRODUCTION
  ? process.env.PRODUCTION_APP_API_KEY
  : process.env.DEV_APP_API_KEY;

export function validateAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV && process.env.NODE_ENV.match("test")) {
    next();
    return;
  }
  if (!API_KEY)
    throw new Error("API_KEY does not exist in environment variables");
  const authHeader = req.headers.authorization;
  const auth = authHeader && authHeader.split(" ")[1];
  if (auth && auth === API_KEY) {
    next();
  } else {
    return res.status(401).send({
      error: "Invalid or missing API key",
    });
  }
}
