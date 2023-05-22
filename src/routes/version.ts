import { z } from "zod";
import { promises as fs } from "fs";
import Logger from "../lib/Logger";
import { Request, Response } from "express";

const schema = z.object({
  version: z.string(),
});

export const version = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.writeHead(400, "Invalid body provided.");
    return;
  }

  const { version } = result.data;

  Logger.log(`Someone using version ${version} connected`);

  const serverVersion = (await fs.readFile("./version.txt")).toString();

  res.write(serverVersion);
  res.end();
};
