import { Router, NextFunction, Request, Response } from "express";
import app from "../../../app";
import { UserController } from "../../../controllers";
import AccountRouter from "./accounts";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  UserController.index(req, res);
});

router.use("/accounts", AccountRouter);

export default router;
