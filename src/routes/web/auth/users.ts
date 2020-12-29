import { Router, NextFunction, Request, Response } from "express";
import app from "../../../app";
import { UserController } from "../../../controllers";
import AccountRouter from "./accounts";
import CategoryRouter from "./categories";
import SubcategoryRouter from "./subcategories";
import TransactionRouter from "./transactions";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  UserController.index(req, res);
});

router.use("/accounts", AccountRouter);
router.use("/categories", CategoryRouter);
router.use("/categories/:categoryId([0-9]+)/subcategories", SubcategoryRouter);
router.use("/transactions", TransactionRouter);

export default router;
