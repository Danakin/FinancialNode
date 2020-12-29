import { Router, NextFunction, Request, Response } from "express";
import { AccountController } from "../../../controllers";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response) {
  AccountController.index(req, res);
});

router.get("/create", function (req: Request, res: Response) {
  AccountController.create(req, res);
});

router.post("/", function (req: Request, res: Response) {
  AccountController.store(req, res);
});

router.get("/:id([0-9]+)", function (req: Request, res: Response) {
  AccountController.edit(req, res);
});

router.put("/:id([0-9]+)", function (req: Request, res: Response) {
  AccountController.update(req, res);
});

router.delete("/:id([0-9]+)", function (req: Request, res: Response) {
  AccountController.destroy(req, res);
});

export default router;
