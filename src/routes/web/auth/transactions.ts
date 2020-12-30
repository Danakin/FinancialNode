import { Router, NextFunction, Request, Response } from "express";
import { TransactionController } from "../../../controllers";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  TransactionController.index(req, res);
});

router.get("/create", function (req: Request, res: Response) {
  TransactionController.create(req, res);
});

router.post("/", function (req: Request, res: Response) {
  TransactionController.store(req, res);
});

export default router;
