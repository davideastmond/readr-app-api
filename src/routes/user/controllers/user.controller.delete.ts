import { Request, Response } from "express";
import { IUserDocument } from "../../../models/user/user.schema.types";

export const deleteBookmark = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const { urls } = req.body;
    const refreshedUser = await user.deleteBookmarks(urls);
    return res.status(201).send(refreshedUser);
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: can't delete bookmark`,
          param: "n/a",
          location: "delete bookmark",
        },
      ],
    });
  }
};

export const deleteTopic = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const { topics } = req.body;
    const refreshedUser = await user.deleteTopics(topics);
    return res.status(201).send(refreshedUser);
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: can't delete topics`,
          param: "n/a",
          location: "delete topics",
        },
      ],
    });
  }
};

export const deleteAllBookmarks = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const refreshedUser = await user.deleteAllBookmarks();
    return res.status(201).send(refreshedUser);
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: can't delete all bookmarks`,
          param: "n/a",
          location: "delete topics",
        },
      ],
    });
  }
};
