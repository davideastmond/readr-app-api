import { Request, Response } from "express";
import { UserUtils } from "../../../controllers/user/utils/user-utils";
import { IUserDocument } from "../../../models/user/user.schema.types";
export const confirmSession = async (req: Request, res: Response) => {
  const { user }: { user: IUserDocument } = res.locals as any;
  if (user) {
    return res
      .status(200)
      .send({ active: true, user: UserUtils.toSecureUser(user) });
  }
  return res.status(401).send({ active: false, user: null });
};
