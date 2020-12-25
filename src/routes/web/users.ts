import { Router, NextFunction, Request, Response } from "express";
import { UserController } from "../../controllers";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  UserController.index(req, res);
});

export default router;
