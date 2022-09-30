import { Request, Response } from "express";
import { IUserDocument } from "../../../models/user/user.schema.types";

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const { url, urlToImage, title } = req.body;
    const updatedUser = await user.putBookmark({ urlToImage, url, title });
    return res.status(201).send(updatedUser);
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message} Can't complete operation - add favorite article`,
          param: "n/a",
          location: "add favorite",
        },
      ],
    });
  }
};
