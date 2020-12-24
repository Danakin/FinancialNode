import { Request, Response } from "express";
import { validationResult } from "express-validator";

function getLogin(req: Request, res: Response) {
  res.render("login.njk");
}
function postLogin(req: Request, res: Response) {
  return res.json(req.body);
}

function getRegister(req: Request, res: Response) {
  res.render("register.njk");
}

function postRegister(req: Request, res: Response) {
  return res.json(req.body);
}

export { getLogin, postLogin, getRegister, postRegister };
