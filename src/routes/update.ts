import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/PrismaClient";

const schema = z.object({
  androidId: z.string(),
  username: z.string(),
});

export const update = async (req: Request, res: Response) => {
  const result = await schema.safeParseAsync(req.body);
  if (!result.success) {
    res.writeHead(400, "Invalid body provided.");
    return res.end();
  }

  const { androidId, username } = result.data;

  const existingAccount = await prisma.user.findFirst({
    where: {
      androidId,
    },
  });

  if (existingAccount?.username) {
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
};
