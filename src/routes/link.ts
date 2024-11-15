import { z } from "zod";
import { getUser } from "../utilities/getUser";
import { Request, Response } from "express";
import prisma from "../lib/PrismaClient";
import { verifyAndroidId } from "../utilities/verifyAndroidId";

const schema = z.object({
  androidId: z.string(),
  username: z.string(),
  key: z.string(),
});

export const link = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.end();
  }

  const { androidId, username, key } = result.data;

  if (!verifyAndroidId(androidId, key)) {
    res.writeHead(400, "Invalid key provided.");
    return res.end();
  }

  const user = await getUser(androidId);
  if (!user) {
    res.writeHead(400, "Invalid androidId provided.");
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
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }

  res.end();
};
