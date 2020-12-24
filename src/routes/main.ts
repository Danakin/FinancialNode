import { Router, NextFunction, Request, Response } from "express";

const router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index.njk", {
    title: "My First Nunjucks App",
    message: "Welcome to Nunjucks Express",
  });
});

router.get(
  "/login",
  function (req: Request, res: Response, next: NextFunction) {
    res.render("login.njk");
  }
);

router.post(
  "/login",
  function (req: Request, res: Response, next: NextFunction) {
    res.send(req.body);
  }
);
router.get(
  "/register",
  function (req: Request, res: Response, next: NextFunction) {
    res.render("register.njk");
  }
);

router.post(
  "/register",
  function (req: Request, res: Response, next: NextFunction) {
    res.send(req.body);
  }
);

export default router;
