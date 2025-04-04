import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/PrismaClient";
import { promises as fs } from "fs";

const schema = z.object({
  androidId: z.string(),
  username: z.string(),
});

export const update = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const result = await schema.safeParseAsync(req.body);
  if (!result.success) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Invalid body provided." }));
  }

  const { androidId, username } = result.data;

  const existingAccount = await prisma.user.findFirst({
    where: {
      androidId,
    },
  });

  if (!existingAccount || existingAccount?.username) {
    return res.end();
  }

  try {
    await prisma.user.update({
      data: {
        username,
      },
      where: {
        androidId,
      },
    });
  } catch (e) {
    await fs.appendFile("./log.txt", username + " " + androidId + "\n");
  }
};
