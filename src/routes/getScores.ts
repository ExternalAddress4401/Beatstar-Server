import { z } from "zod";
import { Request, Response } from "express";
import { getUser } from "../utilities/getUser";
import prisma from "../lib/PrismaClient";
import Logger from "../lib/Logger";

const schema = z.object({
  androidId: z.string().length(16),
});

export const getScores = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.end();
  }

  const { androidId } = result.data;

  Logger.log(`Got score request for ${androidId}`);

  const user = await getUser(androidId);

  if (!user) {
    res.writeHead(400, "Invalid androidId provided.");
    return res.end();
  }

  const scores = await prisma.score.findMany({
    select: {
      beatmapId: true,
      score: true,
    },
    where: {
      userId: user.userId,
    },
  });

  Logger.log(`Scores: ${scores}`);

  res.json(scores);
  res.end();
};
