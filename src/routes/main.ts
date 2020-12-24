import { Router, NextFunction, Request, Response } from "express";

const router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index.njk", {
    title: "My First Nunjucks App",
    message: "Welcome to Nunjucks Express",
  });
});

export default router;
