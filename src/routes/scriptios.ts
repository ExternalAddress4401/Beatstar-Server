import { Request, Response } from "express";
import Logger from "../lib/Logger";
import { promises as fs } from "fs";

export const scriptios = async (req: Request, res: Response) => {
  Logger.log(`Someone requested the latest ios script.`);

  const version = (await fs.readFile("./iosversion.txt")).toString();

  const script = (
    await fs.readFile(`./iosscripts/${version.trim()}/script.js`)
  ).toString();

  res.write(script);
  res.end();
};
