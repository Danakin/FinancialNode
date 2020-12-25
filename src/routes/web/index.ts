import { Router } from "express";

import mainRouter from "./main";
import userRouter from "./users";

const router = Router();

router.use("/", mainRouter);
router.use("/users", userRouter);

export default router;
