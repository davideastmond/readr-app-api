import { query } from "express-validator";
const MAX_PAGE_SIZE = 250;

// Validate the pageSize parameter (optional)
export const getPageSizeValidator = (): any[] => {
  return [
    query("pageSize").optional(),
    query("pageSize").custom((value) => {
      if (!value) return true;
      if (!Number.isInteger(parseInt(value))) return false;
      if (value > MAX_PAGE_SIZE) return false;
      return true;
    }),
  ];
};
