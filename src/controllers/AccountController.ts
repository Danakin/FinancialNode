import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function index(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const accounts = await prisma.account.findMany({
    where: { userId: user.id },
  });
  return res.render("auth/account/index.njk", { accounts: accounts });
}

export { index };
