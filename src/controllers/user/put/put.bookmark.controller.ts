import {
  ISecureUser,
  IUserDocument,
} from "../../../models/user/user.schema.types";
import { UserUtils } from "../utils/user-utils";

export async function putBookmark(
  this: IUserDocument,
  { url, title, urlToImage }: { url: string; title: string; urlToImage: string }
): Promise<ISecureUser> {
  const articles = this.configuration.bookmarks.filter(
    (article) => article.url !== url
  );
  articles.push({ url, title, urlToImage, createdAt: new Date() });
  this.configuration.bookmarks = articles;
  const updatedUser = await this.save();
  return UserUtils.toSecureUser(updatedUser);
}
