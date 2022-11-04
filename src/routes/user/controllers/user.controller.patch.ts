import { Request, Response } from "express";
import { IUserDocument } from "../../../models/user/user.schema.types";

/**
  { option: string, list: [{id: string, name: string}]}
 */
export const patchUserSources = async (req: Request, res: Response) => {
  const { user }: { user: IUserDocument } = res.locals as any;
  try {
    const { option, list } = req.body;
    const data = await user.patchNewsSource({ list, option });
    return res.status(201).send(data);
  } catch (err: any) {
    return res.status(500).send({
      errors: [
        {
          msg: `${err.message}: Server error - cannot get feed`,
          param: "n/a",
          location: "get feed",
        },
      ],
    });
  }
};
