import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function index(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
  });
  return res.render("auth/transaction/index.njk", {
    transactions: transactions,
  });
}

export { index };
