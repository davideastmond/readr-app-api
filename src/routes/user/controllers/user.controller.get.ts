import { Request, Response } from "express";
import { NewsClient } from "../../../controllers/news/clients/news-client";
import { IUserDocument } from "../../../models/user/user.schema.types";

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { user }: { user: IUserDocument } = res.locals as any;
    const topics = user.configuration.topics;

    if (!topics || topics.length === 0) {
      const newsClient = new NewsClient();
      const headlines = await newsClient.fetchHeadlines(35);
      return res.status(200).send(headlines);
    } else {
      const newsClient = new NewsClient();
      const customFeed = await newsClient.fetchFeed(topics);
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
