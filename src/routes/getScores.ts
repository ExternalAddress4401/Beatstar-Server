import { z } from "zod";
import { Request, Response } from "express";
import { getUser } from "../utilities/getUser";
import prisma from "../lib/PrismaClient";

const schema = z.object({
  androidId: z.string().length(16),
});

export const getScores = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return;
  }

  const { androidId } = result.data;

  const user = await getUser(androidId);

  if (!user) {
    res.writeHead(400, "Invalid androidId provided.");
    return;
  }

  const scores = prisma.score.findMany({
    select: {
      beatmapId: true,
      score: true,
    },
    where: {
      userId: user.userId,
    },
  });

  res.json(scores);
  res.end();
};
