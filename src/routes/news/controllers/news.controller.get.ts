import { Request, Response } from "express";
import { NewsClient } from "../../../controllers/news/clients/news-client";

export async function getHeadlines(req: Request, res: Response) {
  try {
    const newsClient = new NewsClient();
    const headlines = await newsClient.fetchHeadlines();
    return res.status(200).send(headlines);
  } catch (err) {
    return res
      .status(500)
      .send({
        errors: [
          {
            msg: `${err.message}: Server error - cannot complete request`,
            param: "n/a",
            location: "authentication",
          },
        ],
      });
  }
}
