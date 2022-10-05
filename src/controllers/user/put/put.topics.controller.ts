import {
  ISecureUser,
  IUserDocument,
} from "../../../models/user/user.schema.types";
import { UserUtils } from "../utils/user-utils";

export async function putTopics(
  this: IUserDocument,
  topics: string[]
): Promise<ISecureUser> {
  const updatedList = Array.from(
    new Set([...this.configuration.topics, ...topics])
  );
  this.configuration.topics = updatedList.filter(
    (word) => word.trim() !== "" && word.trim().length >= 3
  );
  const refreshedUser = await this.save();
  return UserUtils.toSecureUser(refreshedUser);
}
