import { IUserDocument } from "../../../models/user/user.schema.types";
import { CryptoService } from "../../../utils/crypto/crypto";

export async function putUpdateUserPassword(
  this: IUserDocument,
  plainTextPassword: string
) {
  const hashedPassword = await CryptoService.hashPassword({
    password: plainTextPassword,
  });
  this.hashedPassword = hashedPassword;
  await this.save();
}
