require("dotenv").config();
import axios from "axios";
import dayjs from "dayjs";
import { IS_PRODUCTION } from "../../../environment";
import { INewsApiResponse } from "../../../models/news/news-api-response/news-api-response.types";
import { NEWS_SOURCES } from "../../../models/news/sources";
import {
  ISecureUser,
  IUserDocument,
} from "../../../models/user/user.schema.types";
const newsApiKey = IS_PRODUCTION
  ? process.env.PRODUCTION_NEWS_API_KEY
  : process.env.DEV_NEWS_API_KEY;

const newsSources = Object.keys(NEWS_SOURCES).join(",");
const HEADLINES_PAGE_SIZE = parseInt(process.env.HEADLINES_PAGE_SIZE) || 20;
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
  public async fetchHeadlines(
    pageSize = HEADLINES_PAGE_SIZE
  ): Promise<INewsApiResponse> {
    const res = await this.api({
      method: "GET",
      url: `top-headlines?sources=${newsSources}&pageSize=${pageSize}`,
    });
    return res.data;
  }

  public async fetchFeed(
    topics: string[],
    user: IUserDocument | ISecureUser
  ): Promise<INewsApiResponse> {
    const requestQueue = topics.map((topic) => {
      const { from, to } = this.getDateRange();
      const { feed: pageSize } = user.configuration.pageSize;
      return this.api({
        method: "GET",
        url: `everything?q=${topic}&from=${from}&to=${to}&sources=${this.extractUserSources(
          user
        )}&sortBy=relevancy&pageSize=${pageSize}`,
      });
    });

    const fetchResults = await Promise.all(requestQueue);
    const aggregatedResults = fetchResults.reduce(
      (acc, cv) => {
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

  private getDateRange(): { from: string; to: string } {
    const now = dayjs();
    const threeDaysAgo = dayjs().subtract(3, "days");

    return {
      from: threeDaysAgo.format("YYYY-MM-DD"),
      to: now.format("YYYY-MM-DD"),
    };
  }

  private extractUserSources(user: ISecureUser | IUserDocument): string {
    // Check for onlyIncluded sources
    if (!user.configuration.sources) {
      return newsSources;
    }
    if (
      !user.configuration.sources.list ||
      user.configuration.sources.list.length === 0
    ) {
      return newsSources;
    }

    if (user.configuration.sources.option === "onlyInclude") {
      const onlyIncludedSources = Object.keys(NEWS_SOURCES).filter((source) => {
        return (
          user.configuration.sources.list.findIndex(
            (listItem) => listItem.id === source
          ) >= 0
        );
      });
      return onlyIncludedSources.join(",");
    } else if (user.configuration.sources.option === "onlyExclude") {
      const onlyExcludedSources = Object.keys(NEWS_SOURCES).filter((source) => {
        return (
          user.configuration.sources.list.findIndex(
            (listItem) => listItem.id === source
          ) < 0
        );
      });
      return onlyExcludedSources.join(",");
    }
    return newsSources;
  }
}
