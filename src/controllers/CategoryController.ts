import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function index(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
    include: { subcategories: true },
  });
  return res.render("auth/category/index.njk", { categories: categories });
}

function create(req: Request, res: Response) {
  return res.render("auth/category/create.njk", { _csrf: req.csrfToken() });
}

async function store(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
  });
  const number = categories.length;
  const data = {
    name: req.body.name,
    income: req.body.type === "income" ? true : false,
    order: number,
    color: req.body.color,
  };
  const category = await prisma.category.create({
    data: {
      ...data,
      user: { connect: { id: user.id } },
    },
  });
  return res.redirect("/users/categories");
}

async function edit(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const id = Number(req.params.id);
  const verifyCategory = await prisma.category.findMany({
    where: { id: id, userId: user.id },
  });
  if (verifyCategory.length === 0 && user.isAdmin === false)
    return res.render("back");
  const category = await prisma.category.findUnique({
    where: { id: id },
    include: { subcategories: true },
  });
  if (!category) return res.redirect("/users/categories");
  return res.render("auth/category/edit.njk", {
    _csrf: req.csrfToken(),
    category: category,
  });
}

async function update(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const id = Number(req.params.id);
  const verifyCategory = await prisma.category.findMany({
    where: { id: id, userId: user.id },
  });
  if (verifyCategory.length === 0 && user.isAdmin === false)
    return res.render("back");
  const category = await prisma.category.update({
    where: { id: id },
    data: {
      name: req.body.name,
      color: req.body.color,
      income: req.body.type === "income" ? true : false,
      icon: req.body.icon,
      modifiedAt: new Date(),
    },
  });
  res.redirect("/users/categories");
}

async function destroy(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const id = Number(req.params.id);
  const verifyCategory = await prisma.category.findMany({
    where: { id: id, userId: user.id },
  });
  if (verifyCategory.length === 0 && user.isAdmin === false)
    return res.render("back");

  // TODO: THIS IS A WORKAROUND UNTIL CASCADING DELETES WORK WITH PRISMA CAN DELETE AS SOON AS THEY WORK
  const subcategories = await prisma.subcategory.deleteMany({
    where: { categoryId: id },
  });
  // ENDTODO

  const category = await prisma.category.delete({
    where: { id: id },
  });
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { order: "asc" },
  });
  for (let i = 0; i < categories.length; i++) {
    const updatedCategory = await prisma.category.update({
      where: { id: categories[i].id },
      data: { order: i },
    });
  }
  return res.redirect("/users/categories");
}

export { index, create, store, edit, update, destroy };
