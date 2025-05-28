import express from "express";
import morgan from "morgan";
import * as http from "http";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Emitter } from "strict-event-emitter";
import type { CorsOptions } from "cors";
import type { SessionOptions } from "express-session";

export type ServerCoreEvents = {
  ping: [timestamp: number];
  listen: [url: string];
};

export interface ServerCoreOptions {
  port: number | string;
  cors: CorsOptions;
  json?: { limit: string };
  urlencoded?: { limit: string };
  session?: SessionOptions;
}

class ServerCore extends Emitter<ServerCoreEvents> {
  app: ReturnType<typeof express> = express();
  server: http.Server;
  options: ServerCoreOptions;

  constructor(options: ServerCoreOptions) {
    super();
    this.server = http.createServer(this.app);
    this.options = options;

    this.app.use(morgan("dev"));

    if (options.cors) {
      this.app.use(cors(options.cors));
    }
    if (options.json) {
      this.app.use(express.json(options.json));
    }
    if (options.urlencoded) {
      this.app.use(express.urlencoded(options.urlencoded));
    }
    this.app.use(cookieParser());
    if (options.session) {
      this.app.use(session(options.session));
    }

    this.app.listen(options.port, () => {
      this.emit("listen", `http://localhost:${options.port}`);
    });
  }
}

export default ServerCore;
export { ServerCore, express };
