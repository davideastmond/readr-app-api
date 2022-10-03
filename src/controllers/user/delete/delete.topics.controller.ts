import {
  ISecureUser,
  IUserDocument,
} from "../../../models/user/user.schema.types";
import { UserUtils } from "../utils/user-utils";

export async function deleteTopics(
  this: IUserDocument,
  topicsToDelete: string[]
): Promise<ISecureUser> {
  const filteredList = this.configuration.topics.filter(
    (topic) => !topicsToDelete.includes(topic)
  );
  this.configuration.topics = filteredList;
  const refreshedUser = await this.save();
  return UserUtils.toSecureUser(refreshedUser);
}
