import { body } from "express-validator";
const MAX_PAGE_SIZE = 250;

// Validate the pageSize parameter (optional)
export const getPageSizeValidator = (): any[] => {
  return [
    body("pageSize").optional(),
    body("pageSize").custom((value) => {
      if (!value) return true;
      if (!Number.isInteger(value)) return false;
      if (value > MAX_PAGE_SIZE) return false;
      return true;
    }),
  ];
};
