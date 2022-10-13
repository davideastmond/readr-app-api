import { Schema, model, SchemaOptions } from "mongoose";
import { createNewUser } from "../../controllers/user/create/user.create.controller";
import {
  deleteAllBookmarks,
  deleteBookmarks,
} from "../../controllers/user/delete/delete.bookmark.controller";
import { deleteTopics } from "../../controllers/user/delete/delete.topics.controller";
import { putBookmark } from "../../controllers/user/put/put.bookmark.controller";
import { putTopics } from "../../controllers/user/put/put.topics.controller";
import { putUpdateUserPassword } from "../../controllers/user/put/put.update-password.controller";

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
      bookmarks: {
        type: [
          {
            url: String,
            title: String,
            urlToImage: String,
            createdAt: Date,
            source: { name: String, id: String },
          },
        ],
        default: [],
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

userSchema.method("deleteBookmarks", deleteBookmarks);
userSchema.method("deleteAllBookmarks", deleteAllBookmarks);
userSchema.method("deleteTopics", deleteTopics);
userSchema.method("putBookmark", putBookmark);
userSchema.method("putTopics", putTopics);
userSchema.method("putUpdateUserPassword", putUpdateUserPassword);
userSchema.static("createNewUser", createNewUser);

export default userSchema;
export const UserModel = model<IUserDocument, IUserModel>("user", userSchema);
