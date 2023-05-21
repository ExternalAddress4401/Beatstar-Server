import { z } from "zod";
import { promises as fs } from "fs";
import prisma from "../lib/PrismaClient";
import Logger from "../lib/Logger";
import { Request, Response } from "express";
import { getUser } from "../utilities/getUser";

const schema = z.object({
  androidId: z.string().length(16),
  version: z.string(),
});

export const version = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.writeHead(400, "Invalid body provided.");
    return;
  }

  const { androidId, version } = result.data;

  let user = await getUser(androidId);

  //add a row for them
  if (!user) {
    user = await prisma.user.create({
      data: {
        androidId,
      },
    });
  }

  Logger.log(
    `Script version request: ${user.username ?? androidId} - version ${version}`
  );

  const serverVersion = (await fs.readFile("./version")).toString();

  res.write(serverVersion);
  res.end();
};
