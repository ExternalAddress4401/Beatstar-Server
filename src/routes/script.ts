import { Request, Response } from "express";
import Logger from "../lib/Logger";
import { promises as fs } from "fs";

export const script = async (req: Request, res: Response) => {
  Logger.log(`Someone requested the latest script.`);

  const version = (await fs.readFile("./version.txt")).toString().trim();

  const script = (
    await fs.readFile(`./scripts/${version}/script.js`)
  ).toString();

  res.write(script);
  res.end();
};
