import { Express, Express } from "express";
import "express-session";

declare module "express" {
  export interface Request {
    session: Express.Session & {
      user: string;
    };
  }
}
