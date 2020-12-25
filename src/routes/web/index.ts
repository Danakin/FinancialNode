import { Router } from "express";

import loggedIn from "../../middleware/loggedin";

import mainRouter from "./main";
import userRouter from "./users";

const router = Router();

router.use("/", mainRouter);
router.use("/users", loggedIn, userRouter);

export default router;
