import { Router, NextFunction, Request, Response } from "express";
import { CategoryController } from "../../../controllers";

const router = Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  CategoryController.index(req, res);
});

router.get("/create", function (req: Request, res: Response) {
  CategoryController.create(req, res);
});

router.post("/", function (req: Request, res: Response) {
  CategoryController.store(req, res);
});

router.get("/:id([0-9]+)", function (req: Request, res: Response) {
  CategoryController.edit(req, res);
});

router.put("/:id([0-9]+)", function (req: Request, res: Response) {
  CategoryController.update(req, res);
});

router.delete("/:id([0-9]+)", function (req: Request, res: Response) {
  CategoryController.destroy(req, res);
});

export default router;
