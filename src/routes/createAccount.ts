import { Request, Response } from "express";
import { z } from "zod";
import { getUser } from "../utilities/getUser";
import prisma from "../lib/PrismaClient";
import Logger from "../lib/Logger";

const schema = z.object({
  androidId: z.string(),
});

export const createAccount = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.writeHead(400, "Invalid body provided.");
    return res.end();
  }

  const { androidId } = result.data;

  Logger.log(`Checking if ${androidId} already exists...`);

  let user = await getUser(androidId);
  if (!user) {
    user = await prisma.user.create({
      data: {
        androidId,
      },
    });
    Logger.log(`Created new user for ${androidId}`);
  }

  res.end();
};
