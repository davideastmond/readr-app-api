import {
  ISecureUser,
  IUserDocument,
  TCustomSourceFilter,
} from "../../../models/user/user.schema.types";
import { UserUtils } from "../utils/user-utils";

export async function patchNewsSource(
  this: IUserDocument,
  sourceData: {
    list: { id: string; name: string }[];
    option: TCustomSourceFilter;
  }
): Promise<ISecureUser> {
  if (sourceData.option === "none") {
    this.configuration.sources.list = [];
  } else {
    this.configuration.sources.list = sourceData.list;
  }
  if (sourceData.list.length === 0) {
    this.configuration.sources.option = "none";
  } else {
    this.configuration.sources.option = sourceData.option;
  }
  const refreshedUser = await this.save();
  return UserUtils.toSecureUser(refreshedUser);
}
