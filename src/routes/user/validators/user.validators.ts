import { body } from "express-validator";

export const putFavoriteArticleValidator = (): any[] => {
  return [
    body("url").exists().isURL().trim(),
    body("title").exists().trim().escape(),
    body("urlToImage").exists().isURL().trim(),
  ];
};

export const deleteFavoriteArticleValidator = (): any[] => {
  return [body("url").exists().isURL().trim()];
};
