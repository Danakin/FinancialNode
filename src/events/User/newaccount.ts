import { PrismaClient, User, Account } from "@prisma/client";
const prisma = new PrismaClient();

async function register(user: User) {
  const account_defaults = [
    { icon: "wallet", name: "Wallet" },
    { icon: "piggy-bank", name: "PiggyBank" },
    { icon: "bank", name: "Bank" },
    { icon: "credit-card", name: "Credit Card" },
  ];

  const accounts = [];
  for (let i = 0; i < account_defaults.length; i++) {
    const acc = account_defaults[i];
    console.log(acc);
    const account = await prisma.account.create({
      data: {
        name: acc.name,
        icon: acc.icon,
        order: i,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        user: { connect: { id: user.id } },
      },
    });
    accounts.push(account);
  }
}

export default { register };
