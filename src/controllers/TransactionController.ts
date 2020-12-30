import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function index(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    include: { transferAccount: true },
  });
  return res.render("auth/transaction/index.njk", {
    transactions: transactions,
  });
}

async function create(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const accounts = await prisma.account.findMany({
    where: { userId: user.id },
    orderBy: { order: "asc" },
  });
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { order: "asc" },
    include: { subcategories: { orderBy: { order: "asc" } } },
  });
  return res.render("auth/transaction/create.njk", {
    _csrf: req.csrfToken(),
    accounts: accounts,
    categories: categories,
  });
}

async function store(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const [date, time] = req.body.date.split("T");
  const [year, month, day] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");
  const accountId = Number(req.body.account);
  const categoryId = Number(req.body.category);
  const subcategoryId = Number(req.body.subcategory);
  const transferAccountId = Number(req.body.transferAccount);
  const type = req.body.type;
  console.log(req.body);
  console.log(type);
  console.log(
    year,
    month,
    day,
    hours,
    minutes,
    accountId,
    categoryId,
    subcategoryId,
    transferAccountId
  );
  if (type === "transfer") {
    const transaction = await prisma.transaction.create({
      data: {
        amount: Number(req.body.amount),
        description: req.body.description,
        memo: "",
        year: Number(year),
        month: Number(month),
        day: Number(day),
        hours: Number(hours),
        minutes: Number(minutes),
        user: { connect: { id: user.id } },
        account: { connect: { id: accountId } },
        category: { connect: { id: categoryId } },
        subcategory: { connect: { id: subcategoryId } },
        transferAccount: { connect: { id: transferAccountId } },
        income: req.body.type === "income" ? true : false,
        transfer: req.body.type === "transfer" ? true : false,
      },
    });
  } else {
    const transaction = await prisma.transaction.create({
      data: {
        amount: Number(req.body.amount),
        description: req.body.description,
        memo: "",
        year: Number(year),
        month: Number(month),
        day: Number(day),
        hours: Number(hours),
        minutes: Number(minutes),
        user: { connect: { id: user.id } },
        account: { connect: { id: accountId } },
        category: { connect: { id: categoryId } },
        subcategory: { connect: { id: subcategoryId } },
        income: req.body.type === "income" ? true : false,
        transfer: req.body.type === "transfer" ? true : false,
      },
    });
  }

  return res.redirect("/users/transactions");
}

export { index, create, store };
