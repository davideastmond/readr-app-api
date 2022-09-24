import { Schema, model, SchemaOptions } from "mongoose";
import { createNewUser } from "../../controllers/user/create/user.create.controller";
import { IUser, IUserDocument, IUserModel } from "./user.schema.types";

interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}
const userSchema = new Schema<IUser, IUserModel>(
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
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    configuration: {
      topics: {
        type: [String],
        default: [],
      },
      favorites: {
        type: [{ url: String, title: String }],
      },
    },
    countryCode: { type: String, required: true, default: "us" },
  },
  {
    timestamps: true,
    strict: false,
    typePojoToMixed: false,
  } as SchemaOptionsWithPojoToMixed
);

userSchema.static("createNewUser", createNewUser);
export default userSchema;
export const UserModel = model<IUserDocument, IUserModel>("user", userSchema);
