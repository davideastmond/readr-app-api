import {
  IRegistrationSubmissionData,
  ISecureUser,
  IUserModel,
} from "../../../models/user/user.schema.types";
import { CryptoService } from "../../../utils/crypto/crypto";
import { UserUtils } from "../utils/user-utils";

/**
 * Creates a new user in the database. Should return a secure user
 * @param data Data required to create a new user in the DB
 */
export async function createNewUser(
  this: IUserModel,
  data: IRegistrationSubmissionData
): Promise<ISecureUser> {
  const isExistingUser = await checkIfUserExists(this, data.email);
  if (isExistingUser)
    throw new Error(`User with e-mail ${data.email} already exists`);

  const hashedPassword = await CryptoService.hashPassword({
    password: data.plainTextPassword,
  });
  const createdUser = await this.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    countryCode: data.countryCode,
    hashedPassword,
  });

  return UserUtils.toSecureUser(createdUser);
}

const checkIfUserExists = async (
  model: IUserModel,
  email: string
): Promise<boolean> => {
  const user = await model.findOne({ email: email });
  if (user) return true;
  return false;
};
