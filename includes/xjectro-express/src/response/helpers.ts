import { type Response } from "express";
import { ResponseDTO } from "../types/index";

export const response = (res: Response, data: ResponseDTO): Response => {
  const payload: ResponseDTO = {
    success: data.success === undefined ? true : data.success,
    message: data.message,
    data: data.data,
  };

  return res.status(data.code || 200).json(payload);
};

export const exceptionResponse = (res: Response, error: unknown): Response => {
  const payload: Record<string, unknown> = {};

  let statusCode = 500;

  if (typeof error === "object" && error !== null) {
    const err = error as {
      code?: number;
      response?: { status?: number };
      message?: string;
    };

    if (typeof err.code === "number") {
      statusCode = err.code;
    } else if (err.response?.status) {
      statusCode = err.response.status;
    }

    if (err.message) payload.message = err.message;
  }

  return res.status(statusCode).json({
    ...payload,
    success: false,
  });
};
