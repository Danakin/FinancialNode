import { Request, Response } from "express";
import * as argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

import events from "../events";

const prisma = new PrismaClient();

async function index(req: Request, res: Response) {
  const userSession = JSON.parse(req.session.user);
  console.log(userSession);
  const user = await prisma.user.findUnique({
    where: { id: userSession.id },
    include: {
      accounts: true,
      categories: { include: { subcategories: true } },
    },
  });
  return res.render("auth/user/index.njk", { user: user });
}

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
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
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
        accounts: {
          create: [
            {
              icon: "wallet",
              name: "Wallet",
              order: 0,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            },
            {
              icon: "piggy-bank",
              name: "PiggyBank",
              order: 1,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            },
            {
              icon: "bank",
              name: "Bank",
              order: 2,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            },
            {
              icon: "credit-card",
              name: "Credit Card",
              order: 3,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            },
          ],
        },
        categories: {
          create: [
            {
              icon: "cart",
              name: "Shopping",
              order: 0,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "cart", name: "Supermarket", order: 0 },
                  {
                    icon: "store-24-hour",
                    name: "Convenience Store",
                    order: 1,
                  },
                  { icon: "basket", name: "Drugstore", order: 2 },
                  { icon: "television", name: "Electronics", order: 3 },
                  { icon: "sofa", name: "Furniture", order: 4 },
                  { icon: "desk", name: "Office", order: 5 },
                  { icon: "lipstick", name: "Cosmetics", order: 6 },
                  { icon: "paw", name: "Pet", order: 7 },
                  { icon: "smoking", name: "Tabacco", order: 8 },
                  { icon: "glass-mug", name: "Alcohol", order: 9 },
                  { icon: "dots-horizontal", name: "Else", order: 10 },
                ],
              },
            },
            {
              icon: "food",
              name: "Food",
              order: 1,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "silverware", name: "Restaurant", order: 0 },
                  { icon: "food", name: "Fast Food", order: 1 },
                  { icon: "baguette", name: "Breakfast", order: 2 },
                  { icon: "coffee", name: "Brunch", order: 3 },
                  { icon: "food-fork-drink", name: "Lunch", order: 4 },
                  { icon: "noodles", name: "Dinner", order: 5 },
                  { icon: "pizza", name: "Delivery", order: 6 },
                  { icon: "bread-slice", name: "Bakery", order: 7 },
                  { icon: "coffee-outline", name: "Cafe", order: 8 },
                  { icon: "glass-cocktail", name: "Drinks", order: 9 },
                  { icon: "bottle-wine", name: "Bar", order: 10 },
                  { icon: "dots-horizontal", name: "Else", order: 11 },
                ],
              },
            },
            {
              icon: "home",
              name: "Home/Utilities",
              order: 2,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "home", name: "Rent", order: 0 },
                  { icon: "home-variant", name: "Mortgage", order: 1 },
                  { icon: "flash", name: "Electricity", order: 2 },
                  { icon: "water", name: "Water", order: 3 },
                  { icon: "fuel", name: "Gas", order: 4 },
                  { icon: "home-edit", name: "Reform", order: 5 },
                  { icon: "home-flood", name: "Home Insurance", order: 6 },
                  { icon: "dots-horizontal", name: "Else", order: 7 },
                ],
              },
            },
            {
              icon: "cellphone",
              name: "Communication",
              order: 3,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "phone", name: "Telephone", order: 0 },
                  { icon: "cellphone", name: "Cellphone", order: 1 },
                  { icon: "access-point", name: "Internet", order: 2 },
                  { icon: "television", name: "TV Service", order: 3 },
                  { icon: "television-play", name: "Subscription", order: 4 },
                  { icon: "email", name: "Mail Service", order: 5 },
                  { icon: "dots-horizontal", name: "Else", order: 6 },
                ],
              },
            },
            {
              icon: "school",
              name: "Education",
              order: 4,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "school", name: "Tuition", order: 0 },
                  { icon: "book", name: "Reference Books", order: 1 },
                  { icon: "history", name: "Examination Fee", order: 2 },
                  { icon: "teach", name: "Tutoring", order: 3 },
                  { icon: "school-outline", name: "Cram School", order: 4 },
                  { icon: "baby-carriage", name: "Kindergarten", order: 5 },
                  { icon: "teach", name: "Seminar", order: 6 },
                  { icon: "teach", name: "Training", order: 7 },
                  { icon: "dots-horizontal", name: "Else", order: 8 },
                ],
              },
            },
            {
              icon: "train-car",
              name: "Transport",
              order: 5,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "train", name: "Train", order: 0 },
                  { icon: "train-variant", name: "Subway/Tram", order: 1 },
                  { icon: "bus", name: "Bus", order: 2 },
                  { icon: "hail", name: "Taxi", order: 3 },
                  { icon: "airplane-takeoff", name: "Airplane", order: 4 },
                  { icon: "dots-horizontal", name: "Else", order: 5 },
                ],
              },
            },
            {
              icon: "car",
              name: "Automobile",
              order: 6,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "car", name: "Big outlet", order: 0 },
                  { icon: "car-door", name: "Loan", order: 1 },
                  { icon: "gas-station", name: "Gasoline", order: 2 },
                  { icon: "shield-car", name: "Insurance", order: 3 },
                  { icon: "car-arrow-right", name: "Tax", order: 4 },
                  { icon: "parking", name: "Parking", order: 5 },
                  { icon: "boom-gate", name: "Tolls", order: 6 },
                  { icon: "toolbox", name: "Maintenance", order: 7 },
                  { icon: "hammer-screwdriver", name: "Repair", order: 8 },
                  { icon: "car-cog", name: "Leasing", order: 9 },
                  { icon: "car-connected", name: "Rental", order: 10 },
                  { icon: "dots-horizontal", name: "Else", order: 11 },
                ],
              },
            },
            {
              icon: "filmstrip",
              name: "Hobby",
              order: 7,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "book", name: "Books", order: 0 },
                  { icon: "bike", name: "Sport/Fitness", order: 1 },
                  { icon: "chess-king", name: "Board Games", order: 2 },
                  { icon: "gamepad", name: "Video Games", order: 3 },
                  { icon: "laptop-chromebook", name: "Software", order: 4 },
                  { icon: "cellphone", name: "Mobile App", order: 5 },
                  { icon: "theater", name: "Cinema", order: 6 },
                  { icon: "video", name: "Streaming", order: 7 },
                  { icon: "playlist-music", name: "Music", order: 8 },
                  { icon: "emoticon", name: "Cartoon", order: 9 },
                  { icon: "thought-bubble", name: "Comic", order: 10 },
                  { icon: "book-open-variant", name: "Magazine", order: 11 },
                  { icon: "dots-horizontal", name: "Else", order: 12 },
                ],
              },
            },
            {
              icon: "drama-masks",
              name: "Culture",
              order: 8,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "theater", name: "Theater", order: 0 },
                  { icon: "bank", name: "Museum", order: 1 },
                  { icon: "account-music", name: "Concert", order: 2 },
                  { icon: "wallet-travel", name: "Travel", order: 3 },
                  { icon: "dots-horizontal", name: "Else", order: 4 },
                ],
              },
            },
            {
              icon: "tshirt-crew",
              name: "Fashion",
              order: 9,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "tshirt-v", name: "Clothes", order: 0 },
                  { icon: "necklace", name: "Accessoires", order: 1 },
                  { icon: "chair-rolling", name: "Barber", order: 2 },
                  { icon: "yoga", name: "Wellness", order: 3 },
                  { icon: "dishwasher", name: "Laundry", order: 4 },
                  { icon: "dots-horizontal", name: "Else", order: 5 },
                ],
              },
            },
            {
              icon: "needle",
              name: "Medical",
              order: 10,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "hospital-building", name: "Hospital", order: 0 },
                  { icon: "pill", name: "Prescription", order: 1 },
                  { icon: "shield-check", name: "Insurance", order: 2 },
                  { icon: "dots-horizontal", name: "Else", order: 3 },
                ],
              },
            },
            {
              icon: "glass-cocktail",
              name: "Social",
              order: 11,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "gift", name: "Presents", order: 0 },
                  { icon: "party-popper", name: "Party", order: 1 },
                  { icon: "church", name: "Ceremony", order: 2 },
                  { icon: "dots-horizontal", name: "Else", order: 3 },
                ],
              },
            },
            {
              icon: "finance",
              name: "Taxes",
              order: 12,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "cash", name: "Income Tax", order: 0 },
                  { icon: "cash", name: "Sales Tax", order: 1 },
                  { icon: "cash", name: "Residence Tax", order: 2 },
                  { icon: "cash", name: "Automobile Tax", order: 3 },
                  { icon: "cash", name: "Corporate Tax", order: 4 },
                  { icon: "cash", name: "Fines", order: 5 },
                  { icon: "dots-horizontal", name: "Else", order: 6 },
                ],
              },
            },
            {
              icon: "dots-horizontal",
              name: "Else",
              order: 13,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [{ icon: "dots-horizontal", name: "Else", order: 0 }],
              },
            },
            {
              icon: "currency-usd",
              name: "Income",
              order: 14,
              income: true,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              subcategories: {
                create: [
                  { icon: "bank-plus", name: "Salary", order: 0 },
                  { icon: "bank-plus", name: "Repayment", order: 1 },
                  { icon: "bank-plus", name: "Bonus", order: 2 },
                  { icon: "bank-plus", name: "Revenue", order: 3 },
                  { icon: "bank-plus", name: "Business Income", order: 4 },
                  { icon: "bank-plus", name: "Interest", order: 5 },
                  { icon: "dots-horizontal", name: "Else", order: 6 },
                ],
              },
            },
          ],
        },
      },
    }); // TODO: Do sth with this user (implement flash message?)
    events.emit("new_account", newUser);
    return res.redirect("/login");
  }
}

export { index, getLogin, postLogin, getRegister, postRegister };
