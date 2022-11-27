import { Request, Response } from "express";
import { NewsClient } from "../../../controllers/news/clients/news-client";
import { IUserDocument } from "../../../models/user/user.schema.types";

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const topics = user.configuration.topics;

    const { headlines: pageSize } = user.configuration.pageSize;

    if (!topics || topics.length === 0) {
      const newsClient = new NewsClient();
      const headlines = await newsClient.fetchHeadlines(pageSize);
      return res.status(200).send(headlines);
    } else {
      const newsClient = new NewsClient();
      const customFeed = await newsClient.fetchFeed(topics, user);
      return res.status(200).send(customFeed);
    }
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: Server error - cannot get feed`,
          param: "n/a",
          location: "get feed",
        },
      ],
    });
  }
};

export const getUserHeadlines = async (req: Request, res: Response) => {
  // Get the authenticated user's version of headlines so we can use their settings
  // to control page size
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const { headlines: pageSize } = user.configuration.pageSize;
    const newsClient: NewsClient = new NewsClient();
    const headlines = await newsClient.fetchHeadlines(pageSize);
    return res.status(200).send(headlines);
  } catch (err) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: Server error - cannot get user headlines`,
          param: "n/a",
          location: "get user headlines",
        },
      ],
    });
  }
};

export const getUserEmail = async (req: Request, res: Response) => {
  const { user }: { user: IUserDocument } = res.locals as any;
  return res.status(200).send({ _id: user._id, email: user.email });
};
