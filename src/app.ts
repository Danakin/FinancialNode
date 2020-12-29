/* Node.js imports */
import path from "path";

/* Express.js imports */
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import csrf from "csurf";

/* Module imports */
import logger from "morgan";
import nunjucks from "nunjucks";
import dotenv from "dotenv";

/* DataBase with Prisma */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* Session Store */
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";

/* Routes imports */
import routes from "./routes/web";

/* Events */
import { registerEvents } from "./events";
registerEvents();

/* Declare app */
dotenv.config();
const app = express();

/* Declare store */
let RedisStore = connectRedis(session);
let redisClient = redis.createClient();

app.set("view engine", "html");
nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_KEY || "secret",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // 1 month
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
  })
);
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(csrf({ cookie: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// async function main() {
//   const post = await prisma.post.update({
//     where: { id: 1 },
//     data: { published: true },
//   });
//   console.log(post);
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export default app;
