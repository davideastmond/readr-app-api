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
  };
}

export interface IArticleBookmark {
  url: string;
  title: string;
  urlToImage: string;
  createdAt: Date;
}
export interface ISecureUser {
  _id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  configuration: {
    topics: string[];
    bookmarks: IArticleBookmark[];
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
  putBookmark: ({
    url,
    title,
    urlToImage,
  }: {
    url: string;
    title: string;
    urlToImage: string;
  }) => Promise<ISecureUser>;
  putTopics: (topics: string[]) => Promise<ISecureUser>;
  deleteTopics: (topicsToDelete: string[]) => Promise<ISecureUser>;
}

export interface IUserModel extends Model<IUserDocument> {
  createNewUser: (data: IRegistrationSubmissionData) => Promise<ISecureUser>;
}
