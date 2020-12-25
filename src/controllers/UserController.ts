import { Request, Response } from "express";
import * as argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LOGIN FUNCTIONS */
function getLogin(req: Request, res: Response) {
  res.render("login.njk");
}
async function postLogin(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  try {
    if (!user) {
      throw new Error(JSON.stringify({ email: { msg: "No User Found" } }));
    } else {
      const pw_verified = await argon2.verify(user.password, req.body.password);
      if (!pw_verified) {
        throw new Error(
          JSON.stringify({ password: { msg: "Wrong password" } })
        );
      }
    }
  } catch (err) {
    return res.render("login.njk", { errors: JSON.parse(err.message) });
  }
  req.session.user = JSON.stringify({
    user: { email: user.email, isAdmin: user.isAdmin },
  });
  return res.redirect("/users");
}

/* REGISTER FUNCTIONS */
function getRegister(req: Request, res: Response) {
  res.render("register.njk");
}
async function postRegister(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (user) {
    return res.render("register.njk", {
      errors: { email: { msg: "User already exists" } },
    });
  } else {
    const hash = await argon2.hash(req.body.password);
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hash,
      },
    }); // TODO: Do sth with this user (flash message?)
    return res.redirect("/login");
  }
}

export { getLogin, postLogin, getRegister, postRegister };
