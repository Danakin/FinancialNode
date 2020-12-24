import { Router, NextFunction, Request, Response } from "express";
import { UserController } from "../controllers";

import * as loginValidator from "../middleware/validation/login";
import * as registerValidator from "../middleware/validation/register";

import { check, validationResult } from "express-validator";

const router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index.njk", {
    title: "My First Nunjucks App",
    message: "Welcome to Nunjucks Express",
  });
});

router.get("/login", (req: Request, res: Response) => {
  UserController.getLogin(req, res);
});

router.post(
  "/login",
  loginValidator.rules,
  loginValidator.validate,
  (req: Request, res: Response) => {
    UserController.postLogin(req, res);
  }
);

router.get("/register", (req: Request, res: Response) => {
  UserController.getRegister(req, res);
});

router.post(
  "/register",
  registerValidator.rules,
  registerValidator.validate,
  (req: Request, res: Response) => {
    UserController.postRegister(req, res);
  }
);

declare module "express-session" {
  interface Session {
    user: string;
  }
}

router.get(
  "/secret",
  (req: Request, res: Response, next: NextFunction) => {
    req.session.user = "danny";
    next();
  },
  (req: Request, res: Response) => {
    res.json({ msg: "ok" });
  }
);

export default router;
