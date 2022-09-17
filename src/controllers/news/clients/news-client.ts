require("dotenv").config();
import axios from "axios";
import { IS_PRODUCTION } from "../../../environment";
import { INewsApiResponse } from "../../../models/news/news-api-response/news-api-response.types"
import { NEWS_SOURCES } from "../../../models/news/sources";
const newsApiKey = IS_PRODUCTION ?
  process.env.PRODUCTION_API_KEY : process.env.DEV_NEWS_API_KEY;

const newsSources = NEWS_SOURCES.join(",")

export class NewsClient {
  public async fetchHeadlines (): Promise<INewsApiResponse> {
    const res = await axios({
      method: "GET",
      url: `https://newsapi.org/v2/top-headlines?sources=${newsSources}&apiKey=${newsApiKey}`
    })

    return res.data;
  }
}
