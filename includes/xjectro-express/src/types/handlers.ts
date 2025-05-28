import type { Application, Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";
export type { ResponseDTO } from "./response";

type Class<T = any> = new (...args: any[]) => T;

export type RequestHandler<
  Params = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = ParsedQs,
  Locals extends Record<string, unknown> = Record<string, unknown>,
> = (
  req: Request<Params, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody>,
  next: NextFunction,
) => void | Promise<void>;

export interface RoutesHandlerOptionsRoute {
  handlerClass: Class;
  prefix: string;
}

export interface RoutesHandlerOptions {
  app: Application;
  routes: RoutesHandlerOptionsRoute[];
}
