import { Document, Model } from "mongoose";
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  countryCode: string;
  configuration: {
    topics: string[];
    bookmarks: IArticleBookmark[];
    sources: {
      option: TCustomSourceFilter;
      list: INewsSource[];
    };
  };
}

export type TCustomSourceFilter = "none" | "onlyInclude" | "onlyExclude";
export interface IArticleBookmark {
  url: string;
  title: string;
  urlToImage: string;
  source: INewsSource;
  createdAt: Date;
}

export interface INewsSource {
  name: string;
  id: string;
}
export interface ISecureUser {
  _id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  configuration: {
    topics: string[];
    bookmarks: IArticleBookmark[];
    sources: {
      option: string;
      list: INewsSource[];
    };
  };
}

export interface IRegistrationSubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  plainTextPassword: string;
  countryCode: string;
}

export interface IUserDocument extends IUser, Document {
  deleteBookmarks: (articleUrls: string[]) => Promise<ISecureUser>;
  deleteAllBookmarks: () => Promise<ISecureUser>;
  putBookmark: ({
    url,
    title,
    urlToImage,
    source,
  }: {
    url: string;
    title: string;
    urlToImage: string;
    source: { name: string; id: string };
  }) => Promise<ISecureUser>;
  putTopics: (topics: string[]) => Promise<ISecureUser>;
  deleteTopics: (topicsToDelete: string[]) => Promise<ISecureUser>;
  putUpdateUserPassword: (plainTextPassword: string) => Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
  createNewUser: (data: IRegistrationSubmissionData) => Promise<ISecureUser>;
}
