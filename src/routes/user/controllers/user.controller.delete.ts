import { Request, Response } from "express";
import { IUserDocument } from "../../../models/user/user.schema.types";

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const { url } = req.body;
    const refreshedUser = await user.deleteBookmark(url);
    return res.status(201).send(refreshedUser);
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: can't delete favorite`,
          param: "n/a",
          location: "delete favorite",
        },
      ],
    });
  }
};
