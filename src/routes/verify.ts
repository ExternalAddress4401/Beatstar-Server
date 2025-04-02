import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/PrismaClient";

const schema = z.object({
  username: z.string(),
  token: z.string(),
});

export const verify = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const result = await schema.safeParseAsync(req.body);
  if (!result.success) {
    res.writeHead(400, { errors: JSON.stringify(result.error) });
    return res.end();
  }

  const { username, token } = result.data;

  if (token !== process.env.TOKEN) {
    res.writeHead(401);
    return res.end(
      JSON.stringify({ code: "invalid-token", error: "Invalid token." })
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    res.writeHead(404);
    return res.end(
      JSON.stringify({
        code: "not-found",
        error: "No user found with that username.",
      })
    );
  }

  if (user.verified) {
    res.writeHead(409);
    return res.end(
      JSON.stringify({
        code: "alreasdy-verified",
        error: "User is already verified.",
      })
    );
  }

  await prisma.user.update({
    data: {
      verified: true,
    },
    where: {
      username,
    },
  });

  return res.end();
};
