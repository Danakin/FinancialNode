import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

export function registerEvents() {
  eventEmitter.on("new_account", (args) => {
    console.log("NEW ACCOUNT", args);
  });
}

export default eventEmitter;
