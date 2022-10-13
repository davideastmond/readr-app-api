require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../../models/user/user.schema";
import { JWTokenManager } from "../../../utils/jwt";
import { TTokenSession } from "../../../utils/jwt/definitions";

export async function jwtVerifyMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV && process.env.NODE_ENV.match("test")) {
    next();
    return;
  }
  const unauthorized = (message: string) =>
    res.status(401).json({
      error: message,
    });

  const requestHeader = "x-jwt-token";
  const responseHeader = "x-renewed-jwt-token";
  const tokenFromHeader = req.header(requestHeader);

  if (
    !tokenFromHeader ||
    tokenFromHeader === "null" ||
    tokenFromHeader === null
  ) {
    return unauthorized("X-JWT-Token is null or missing");
  }

  try {
    const decodedSession = await JWTokenManager.decodeSession(tokenFromHeader);
    if (decodedSession.type !== "valid") {
      return unauthorized("Token is missing or invalid in this request");
    }
    const sessionStatus = JWTokenManager.checkExpirationStatus(
      decodedSession.session
    );

    if (sessionStatus === "expired") {
      return unauthorized("Session expired");
    }

    let session: TTokenSession;

    if (sessionStatus === "grace") {
      const { token, expires, issued } = await JWTokenManager.encodeSession(
        decodedSession.session
      );
      session = {
        ...decodedSession.session,
        expires,
        issued,
      };
      res.setHeader(responseHeader, token);
    } else {
      session = decodedSession.session;
    }
    res.locals = {
      ...res.locals,
      session,
    };

    next();
  } catch (decodedSessionException: any) {
    return unauthorized(decodedSessionException.message);
  }
}

// middleware that extracts the user and adds it to locals
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.session) {
    if (res.locals.session._id) {
      const { _id } = res.locals.session;
      try {
        const user = await UserModel.findById(_id);
        if (user) {
          res.locals.user = user;
          next();
        } else {
          return res
            .status(404)
            .send({ error: "getUser-404: Invalid session user" });
        }
      } catch (err: any) {
        return res
          .status(500)
          .send({
            error: "getUser-500: Server error - error conneting to database",
          });
      }
    } else {
      return res
        .status(400)
        .send({ error: "getUser-400A: Invalid session user" });
    }
  } else {
    return res
      .status(400)
      .send({ error: "getUser-400B: Invalid session user" });
  }
};
