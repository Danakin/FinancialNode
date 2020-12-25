import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function index(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
  });
  return res.render("auth/category/index.njk", { categories: categories });
}

export { index };
