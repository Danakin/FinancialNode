import { Router, NextFunction, Request, Response } from "express";
import { SubcategoryController } from "../../../controllers";

const router = Router({ mergeParams: true });

router.post("/", function (req: Request, res: Response) {
  SubcategoryController.store(req, res);
});
router.delete(
  "/:subcategoryId([0-9]+)",
  function (req: Request, res: Response, next: NextFunction) {
    SubcategoryController.destroy(req, res);
  }
);

export default router;
