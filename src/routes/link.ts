import { z } from "zod";
import { getUser } from "../utilities/getUser";
import { Request, Response } from "express";
import prisma from "../lib/PrismaClient";

const schema = z.object({
  androidId: z.string().length(16),
  username: z.string(),
  key: z.string(),
});

export const link = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.end();
  }

  const { androidId, username, key } = result.data;

  //TODO: validate key

  const user = await getUser(androidId);
  if (!user) {
    res.writeHead(400, "Invalid androidId provided.");
    return res.end();
  }

  await prisma.user.update({
    data: {
      username,
    },
    where: {
      androidId,
    },
  });

  res.end();
};
