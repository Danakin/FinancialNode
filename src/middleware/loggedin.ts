import { NextFunction, Request, Response } from "express";

function loggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

export default loggedIn;
