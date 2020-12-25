import { EventEmitter } from "events";
import { User } from "@prisma/client";
import newAccount from "./User/newaccount";
const eventEmitter = new EventEmitter();

export function registerEvents() {
  eventEmitter.on("new_account", (user: User) => {
    // newAccount.register(args);
    console.log("User registered", user);
  });
}

export default eventEmitter;
