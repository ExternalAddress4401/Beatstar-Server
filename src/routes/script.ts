import { Request, Response } from "express";
import { z } from "zod";
import Logger from "../lib/Logger";
import { promises as fs } from "fs";

const schema = z.object({
  androidId: z.string().length(16),
});

export const script = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.writeHead(400, "Invalid body provided.");
    return;
  }

  const { androidId } = result.data;

  Logger.log(`${androidId} requested the latest script.`);

  //TODO: test for directory traversal

  const version = (await fs.readFile("../../version.txt")).toString();

  const script = (
    await fs.readFile(`../../scripts/${version}/script.js`)
  ).toString();

  res.write(script);
  res.end();
};
