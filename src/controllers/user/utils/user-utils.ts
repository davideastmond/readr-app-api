import {
  ISecureUser,
  IUserDocument,
} from "../../../models/user/user.schema.types";

export const UserUtils = {
  toSecureUser: (user: IUserDocument): ISecureUser => {
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      countryCode: user.countryCode,
      configuration: user.configuration,
    };
  },
};
