import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function index(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const accounts = await prisma.account.findMany({
    where: { userId: user.id },
    orderBy: { order: "asc" },
  });
  return res.render("auth/account/index.njk", { accounts: accounts });
}

function create(req: Request, res: Response) {
  return res.render("auth/account/create.njk", { _csrf: req.csrfToken() });
}

async function store(req: Request, res: Response) {
  const user = JSON.parse(req.session.user);
  const accounts = await prisma.account.findMany({
    where: { userId: user.id },
  });
  const number = accounts.length;
  const data = {
    name: req.body.name,
    balance: Number(req.body.balance),
    order: number,
    color: req.body.color,
  };
  const account = await prisma.account.create({
    data: {
      ...data,
      user: { connect: { id: user.id } },
    },
  });
  return res.redirect("/users/accounts");
}

async function edit(req: Request, res: Response) {
  const id = Number(req.params.id);
  const account = await prisma.account.findUnique({
    where: { id: id },
  });
  return res.render("auth/account/edit.njk", {
    _csrf: req.csrfToken(),
    account: account,
  });
}

async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const account = await prisma.account.update({
    where: { id: id },
    data: {
      name: req.body.name,
      balance: Number(req.body.balance) || 0,
      color: req.body.color,
      icon: req.body.icon,
      modifiedAt: new Date(),
    },
  });
  res.redirect("/users/accounts");
}

async function destroy(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = JSON.parse(req.session.user);
  const account = await prisma.account.delete({
    where: { id: id },
  });
  const accounts = await prisma.account.findMany({
    where: { userId: user.id },
    orderBy: { order: "asc" },
  });
  for (let i = 0; i < accounts.length; i++) {
    const updatedAccount = await prisma.account.update({
      where: { id: accounts[i].id },
      data: { order: i },
    });
  }
  return res.redirect("/users/accounts");
}

export { index, create, store, edit, update, destroy };
