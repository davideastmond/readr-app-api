import { body } from "express-validator";
import { NEWS_SOURCES } from "../../../models/news/sources";

const newsSources = Object.keys(NEWS_SOURCES);
const PAGE_SIZE_NUMERIC_OPTIONS = [10, 20, 30, 40, 50, 60];
export const putBookmarkValidator = (): any[] => {
  return [
    body("url").exists().isURL().trim(),
    body("title").exists().trim(),
    body("urlToImage").exists().isURL().trim(),
    body("source").exists(),
    body("source.id").exists().isString(),
    body("source.name").exists().isString(),
  ];
};

export const deleteFavoriteArticleValidator = (): any[] => {
  return [body("urls").exists().isArray()];
};

export const putUpdatePasswordValidator = (): any[] => {
  return [body("password").exists().isString()];
};
export const topicValidator = (): any[] => {
  return [
    body("topics")
      .exists()
      .isArray()
      .customSanitizer((value: string[]) => {
        return value.map((v) => v.toLowerCase());
      }),
  ];
};

export const patchNewsSourcesValidator = (): any[] => {
  return [
    body("option").custom((value) => {
      return ["none", "onlyInclude", "onlyExclude"].includes(value);
    }),
    body("list").isArray(),
    body("list").custom((value: { id: string; name: string }[], { req }) => {
      if (value.length === 0 && req.body.option === "none") return true;
      return value.every((element) => {
        return element.id && element.name;
      });
    }),
  ];
};

// This will determine that every incoming news source item in list array is
// an approved source
export const validateNewsSourcesValidator = (): any[] => {
  return [
    body("list").custom((value: { id: string; name: string }[], { req }) => {
      if (value.length === 0 && req.body.option === "none") return true;
      for (let listValue of value) {
        if (!newsSources.includes(listValue.id)) return false;
      }
      return true;
    }),
  ];
};

export const patchPageSizesValidator = (): any[] => {
  return [
    body("headlines")
      .isInt()
      .custom((value) => {
        return PAGE_SIZE_NUMERIC_OPTIONS.includes(value);
      }),
    body("feed")
      .isInt()
      .custom((value) => {
        return PAGE_SIZE_NUMERIC_OPTIONS.includes(value);
      }),
  ];
};
