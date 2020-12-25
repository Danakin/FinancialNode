import { Router, NextFunction, Request, Response } from "express";
import { AccountController } from "../../../controllers";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  AccountController.index(req, res);
});

export default router;
