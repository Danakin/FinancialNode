import { Router, NextFunction, Request, Response } from "express";
import { CategoryController } from "../../../controllers";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  CategoryController.index(req, res);
});

export default router;
