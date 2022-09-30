import { Response, Request, NextFunction } from "express";
import { UserModel } from "../../../models/user/user.schema";
import { CryptoService } from "../../../utils/crypto/crypto";
import { JWTokenManager } from "../../../utils/jwt";
import { UserUtils } from "../../../controllers/user/utils/user-utils";
export const processUserRegistration = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, plainTextPassword, countryCode } =
      req.body;

    const user = await UserModel.createNewUser({
      firstName,
      lastName,
      email,
      plainTextPassword,
      countryCode,
    });
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({
      errors: [
        { msg: `${err.message}`, param: "n/a", location: "authentication" },
      ],
    });
  }
};

export const authenticateEmailPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, plainTextPassword } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user)
      return res.status(404).send({
        errors: [
          {
            msg: "Invalid e-mail or password combination",
            param: "n/a",
            location: "authentication",
          },
        ],
      });
    const isValidPassword = await CryptoService.checkPassword({
      hashedPassword: user.hashedPassword,
      plainTextPassword: plainTextPassword,
    });
    if (!isValidPassword)
      return res.status(404).send({
        errors: [
          {
            msg: "Invalid e-mail or password combination",
            param: "n/a",
            location: "authentication",
          },
        ],
      });

    // Pass the user on and continue the request
    res.locals.secureUser = UserUtils.toSecureUser(user);
    res.locals.action = "login";
    next();
  } catch (err) {
    return res.status(500).send({
      errors: [
        { msg: `${err.message}`, param: "n/a", location: "authentication" },
      ],
    });
  }
};

export const generateToken = async (req: Request, res: Response) => {
  // Generate token and send to user
  const { secureUser } = res.locals;
  let action = res.locals.action; // grab what's here. If it's undefined, we'll assume it's some other kind of action request

  if (!secureUser)
    return res.status(500).send({
      errors: [
        {
          msg: "user is not defined on response object",
          param: "n/a",
          location: "authentication",
        },
      ],
    });
  if (!action) action = "default";
  const partialSession = {
    _id: secureUser._id,
    email: secureUser.email,
  };
  try {
    const jwtResponse = await JWTokenManager.encodeSession(partialSession);
    return res.status(200).send({
      action: action,
      token: jwtResponse.token,
      user: secureUser,
    });
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: error generating token`,
          param: "n/a",
          location: "authentication",
        },
      ],
    });
  }
};
