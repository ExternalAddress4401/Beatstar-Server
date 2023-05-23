import { z } from "zod";
import { Request, Response } from "express";
import prisma from "../lib/PrismaClient";
import { getUser } from "../utilities/getUser";
import Logger from "../lib/Logger";

const schema = z.object({
  androidId: z.string().length(16),
  score: z.number().min(0).max(100000),
  beatmapId: z.number(),
});

export const saveScore = async (req: Request, res: Response) => {
  Logger.log(`Got a score request ${JSON.stringify(req.body)}`);
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.writeHead(400, "Invalid body provided.");
    return res.end();
  }

  const { androidId, score, beatmapId } = result.data;

  const user = await prisma.user.findUnique({
    select: {
      userId: true,
      Score: {
        select: {
          score: true,
        },
        where: {
          beatmapId,
        },
      },
    },
    where: {
      androidId,
    },
  });

  if (!user) {
    res.writeHead(400, "Invalid androidId provided.");
    return res.end();
  }

  if (score > user.Score[0].score) {
    Logger.log("Got a better score");
    await prisma.score.upsert({
      create: {
        userId: user.userId,
        score,
        beatmapId,
      },
      update: {
        score,
      },
      where: {
        userId_beatmapId: {
          userId: user.userId,
          beatmapId,
        },
      },
    });
  }

  res.end();
};
