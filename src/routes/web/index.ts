import { Request, Response, Router } from "express";

import loggedIn from "../../middleware/loggedin";

import mainRouter from "./main";
import userRouter from "./auth/users";

const router = Router();

router.use("/", mainRouter);
router.get("/dashboard", (req: Request, res: Response) => {
  return res.redirect("/users");
});
router.use("/users", loggedIn, userRouter);

export default router;
