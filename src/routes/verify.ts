import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/PrismaClient";

const schema = z.object({
  username: z.string(),
  token: z.string(),
});

export const verify = async (req: Request, res: Response) => {
  const result = await schema.safeParseAsync(req.body);
  if (!result.success) {
    res.writeHead(400, { errors: JSON.stringify(result.error) });
    return res.end();
  }

  const { username, token } = result.data;

  if (token !== process.env.TOKEN) {
    res.writeHead(401, { error: "Invalid token." });
    return res.end();
  }

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user?.verified) {
    res.writeHead(409, { error: "User is already verified." });
    return res.end();
  }

  await prisma.user.update({
    data: {
      verified: true,
    },
    where: {
      username,
    },
  });
};
