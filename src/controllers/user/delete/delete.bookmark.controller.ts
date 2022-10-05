import {
  ISecureUser,
  IUserDocument,
} from "../../../models/user/user.schema.types";
import { UserUtils } from "../utils/user-utils";

export async function deleteBookmarks(
  this: IUserDocument,
  articleUrls: string[]
): Promise<ISecureUser> {
  const articleFavorites = this.configuration.bookmarks.filter(
    (article) => !articleUrls.includes(article.url)
  );
  this.configuration.bookmarks = articleFavorites;
  const updatedUser = await this.save();
  return UserUtils.toSecureUser(updatedUser);
}

export async function deleteAllBookmarks(this: IUserDocument) {
  this.configuration.bookmarks = [];
  const updatedUser = await this.save();
  return UserUtils.toSecureUser(updatedUser);
}
