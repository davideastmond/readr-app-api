import {
  ISecureUser,
  IUserDocument,
} from "../../../models/user/user.schema.types";
import { UserUtils } from "../utils/user-utils";

export async function deleteBookmark(
  this: IUserDocument,
  articleUrl: string
): Promise<ISecureUser> {
  const articleFavorites = this.configuration.bookmarks.filter(
    (article) => article.url !== articleUrl
  );
  this.configuration.bookmarks = articleFavorites;
  const updatedUser = await this.save();
  return UserUtils.toSecureUser(updatedUser);
}
