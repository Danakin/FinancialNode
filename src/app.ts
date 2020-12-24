/* Node.js imports */
import path from "path";

/* Express.js imports */
import express from "express";
import cookieParser from "cookie-parser";

/* Module imports */
import logger from "morgan";
import nunjucks from "nunjucks";
import dotenv from "dotenv";

/* DataBase with Prisma */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* Routes imports */
import routes from "./routes/";

/* Declare app */
dotenv.config();
const app = express();

app.set("view engine", "html");
nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

async function main() {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default app;
