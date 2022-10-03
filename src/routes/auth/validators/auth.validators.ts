import { body } from "express-validator";
import { SUPPORTED_COUNTRIES } from "../../../models/news/supported-countries";
import { StringHelper } from "../../../utils/string-helpers";
export const registrationValidator = (): any[] => {
  return [
    body("email").exists().isEmail().normalizeEmail(),
    body("firstName").exists().trim().escape(),
    body("lastName").exists().trim().escape(),
    body("countryCode").custom((value: string) => {
      const supportedCountryCodes = SUPPORTED_COUNTRIES.map((code) => code.id);
      if (!supportedCountryCodes.includes(value)) {
        throw new Error("Invalid country code detected");
      }
      return true;
    }),
    body("plainTextPassword").custom((value: string) => {
      if (!StringHelper.validatePasswordComplexity(value)) {
        throw new Error(
          "Password should be at least 8 characters, contain a number, an uppercase letter and a special character"
        );
      }
      return true;
    }),
  ];
};

export const emailPasswordValidator = (): any[] => {
  return [
    body("email").exists().isEmail().trim().escape(),
    body("plainTextPassword").exists(),
  ];
};
