import { Router, Request, Response, NextFunction } from "express";
import { RoutesHandlerOptions, ResponseDTO } from "../types/index";
import { response, exceptionResponse } from "../response/helpers";

export const wrapHandler = <T extends ResponseDTO>(
  fn: (
    req: Request,
    res: Response,
    next?: NextFunction,
  ) => T | Promise<T> | void | Promise<void>,
) => {
  return async (req: Request, res: Response, next?: NextFunction) => {
    try {
      const fnResponse = await fn(req, res, next);

      if (res.headersSent) {
        return;
      }

      if (fnResponse !== null && fnResponse !== undefined) {
        const resolvedFnResponse = fnResponse as T;
        if (resolvedFnResponse.success === undefined) {
          resolvedFnResponse.success = true;
        }
        response(res, resolvedFnResponse);
      }
    } catch (err) {
      if (!res.headersSent) {
        exceptionResponse(res, err);
      } else {
        console.error(
          "Error occurred in handler after response was sent:",
          err,
        );
      }
    }
  };
};

export class RoutesHandler {
  options: RoutesHandlerOptions;
  constructor(options: RoutesHandlerOptions) {
    this.options = options;

    for (const route of options.routes) {
      const router = Router();
      this.options.app.use(route.prefix, router);

      new route.handlerClass(router);
    }
  }
}
