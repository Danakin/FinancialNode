import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function store(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const categoryId = Number(req.params.categoryId);
  const verifyCategory = await prisma.category.findMany({
    where: { id: categoryId, userId: user.id },
  });
  if (verifyCategory.length === 0 && user.isAdmin === false)
    return res.render("back");

  const categories = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { subcategories: true },
  });

  const subcategory = await prisma.subcategory.create({
    data: {
      name: req.body.name,
      order: categories ? categories.subcategories.length : 0,
      category: { connect: { id: categoryId } },
    },
  });

  res.status(200).send({ subcategory });
}

async function destroy(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const categoryId = Number(req.params.categoryId);
  const subcategoryId = Number(req.params.subcategoryId);

  const verifyUserOwned = await prisma.category.findMany({
    where: { id: categoryId, userId: user.id },
  });

  if (verifyUserOwned.length === 0) res.redirect("back");

  const subcategory = await prisma.subcategory.deleteMany({
    where: { categoryId: categoryId, id: subcategoryId },
  });

  const subcategories = await prisma.subcategory.findMany({
    where: { categoryId: categoryId },
    orderBy: { order: "asc" },
  });
  for (let i = 0; i < subcategories.length; i++) {
    const updatedSubcategory = await prisma.subcategory.update({
      where: { id: subcategories[i].id },
      data: { order: i },
    });
  }

  res.status(200).send({ success: "message" });
}

export { store, destroy };
