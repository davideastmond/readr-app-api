require("dotenv").config();
import axios from "axios";
import { IS_PRODUCTION } from "../../../environment";
import { INewsApiResponse } from "../../../models/news/news-api-response/news-api-response.types";
import { NEWS_SOURCES } from "../../../models/news/sources";
const newsApiKey = IS_PRODUCTION
  ? process.env.PRODUCTION_NEWS_API_KEY
  : process.env.DEV_NEWS_API_KEY;

const newsSources = NEWS_SOURCES.join(",");

export class NewsClient {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: `https://newsapi.org/v2`,
      headers: {
        "X-Api-Key": newsApiKey,
      },
    });
  }
  public async fetchHeadlines(pageSize = 20): Promise<INewsApiResponse> {
    const res = await this.api({
      method: "GET",
      url: `top-headlines?sources=${newsSources}&pageSize=${pageSize}`,
    });
    return res.data;
  }

  public async fetchFeed(
    topics: string[],
    pageSize = 10
  ): Promise<INewsApiResponse> {
    const requestQueue = topics.map((topic) => {
      return this.api({
        method: "GET",
        url: `everything?q=${topic}&sources=${newsSources}&sortBy=relevancy&pageSize=${pageSize}`,
      });
    });

    const fetchResults = await Promise.all(requestQueue);
    const aggregatedResults = fetchResults.reduce(
      (acc, cv, index) => {
        return {
          status: "ok",
          totalResults: acc.totalResults + cv.data.totalResults,
          articles: [...acc.articles, ...cv.data.articles],
        };
      },
      { status: "", totalResults: 0, articles: [] }
    );
    return aggregatedResults;
  }
}
