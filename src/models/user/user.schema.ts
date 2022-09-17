import { Schema, model, SchemaOptions } from "mongoose";
import { IUser, IUserDocument, IUserModel } from "./user.types";

interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}
const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    configuration: {
      topics: {
        type: [String],
        default: []
      },
      favorites: {
        type: [{ url: String, title: String }]
      }
    },
    countryCode: { type: String, required: true, default: "us" }
  },
  {
    timestamps: true,
    strict: false,
    typePojoToMixed: false,
  } as SchemaOptionsWithPojoToMixed
)

export default userSchema;
export const UserModel = model<IUserDocument, IUserModel>("user", userSchema);
