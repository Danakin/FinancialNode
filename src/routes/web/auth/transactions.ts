import { Router, NextFunction, Request, Response } from "express";
import { TransactionController } from "../../../controllers";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  TransactionController.index(req, res);
});

export default router;
