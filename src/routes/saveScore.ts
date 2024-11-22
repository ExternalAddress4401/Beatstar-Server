import { z } from "zod";
import { Request, Response } from "express";
import prisma from "../lib/PrismaClient";
import Logger from "../lib/Logger";

const schema = z.object({
  androidId: z.string(),
  score: z.number().min(0).max(100000),
  beatmapId: z.number().max(2147483647),
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

  if (!user.Score.length) {
    await prisma.score.create({
      data: {
        userId: user.userId,
        beatmapId,
        score,
      },
    });
  } else if (score > user.Score[0].score) {
    await prisma.score.update({
      data: {
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
