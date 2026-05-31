import chalk from "chalk";
import { getTimestamp } from "../app.js";

const users = ["john", "james", "sarah"];

export function getUsers(req, res) {
  console.log(chalk.yellow(getTimestamp(), "Sending Users:", users, "..."));
  res.status(200).json({users:users});
  console.log(chalk.green(getTimestamp(), "Send Users successfully!"));
  return;
}

export function createUser(req, res) {

    const name = req.body.name
    console.log(chalk.yellow(getTimestamp(),"creating User..."))
    if (!name) {
        console.log(chalk.red(getTimestamp(), "Username missing"));
        
        return res.status(400).json({
          success: false,
          message: "Name missing",
        });
    }

    users.push(name)
  res.status(200).json(users);
  console.log(chalk.green(getTimestamp(), "Created User", name, "successfully!"));
  return;
}