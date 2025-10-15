import { Request, Response, NextFunction, RequestHandler } from "express";
import chalk, { ChalkInstance } from "chalk";

type ResponseLogging = {
  time: string;
  hostname: string;
  method: string;
  path: string;
  status: number;
  duration: string;
};

const logger: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log: ResponseLogging = {
      time: new Date().toISOString(),
      hostname: req.hostname,
      method: req.method,
      path: req.originalUrl || req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
    };


    let statusColor: ChalkInstance = chalk.green
    if(log.status >= 400 && log.status < 500){
      statusColor = chalk.yellow
    }
    if(log.status >= 500){
      statusColor = chalk.redBright
    }

    const logLine: string[] = [
      chalk.gray(log.time),
      chalk.cyan(log.method),
      chalk.white(log.path),
      statusColor(log.status),
      chalk.magenta(log.duration)
    ]
    console.log(JSON.stringify(logLine));
  });
  next();
};

export default logger;
