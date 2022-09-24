import { Document, Model } from "mongoose";
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  countryCode: string;
  configuration: {
    topics: string[];
    favorites: { url: string; title: string }[];
  };
}

export interface ISecureUser {
  _id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  configuration: {
    topics: string[];
    favorites: { url: string; title: string }[];
  };
}

export interface IRegistrationSubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  plainTextPassword: string;
  countryCode: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  createNewUser: (data: IRegistrationSubmissionData) => Promise<ISecureUser>;
}
