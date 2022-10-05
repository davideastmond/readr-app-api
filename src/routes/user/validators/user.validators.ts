import { body } from "express-validator";

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
