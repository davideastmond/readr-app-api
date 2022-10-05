import { Request, Response } from "express";
import { IUserDocument } from "../../../models/user/user.schema.types";

export const addBookmark = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const { url, urlToImage, title, source } = req.body;
    const updatedUser = await user.putBookmark({
      urlToImage,
      url,
      title,
      source,
    });
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

export const putTopics = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const { topics } = req.body;
    const updatedUser = await user.putTopics(topics);
    return res.status(201).send(updatedUser);
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message} Can't complete operation - add user topics`,
          param: "n/a",
          location: "add user topics",
        },
      ],
    });
  }
};
