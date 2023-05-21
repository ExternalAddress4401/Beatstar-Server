import { z } from "zod";
import { Request, Response } from "express";
import prisma from "../lib/PrismaClient";
import { getUser } from "../utilities/getUser";

const schema = z.object({
  androidId: z.string().length(16),
  score: z.number().min(0).max(100000),
  beatmapId: z.number(),
});

export const saveScore = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.writeHead(400, "Invalid body provided.");
    return;
  }

  const { androidId, score, beatmapId } = result.data;

  const user = await getUser(androidId);

  if (!user) {
    res.writeHead(400, "Invalid androidId provided.");
    return;
  }

  await prisma.score.create({
    data: {
      userId: user.userId,
      score,
      beatmapId,
    },
  });

  res.end();
};
