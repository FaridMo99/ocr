import chalk from "chalk";
import { getTimestamp } from "../../app.js";

export function processFile(req, res) {
  console.log(chalk.yellow(getTimestamp(), "Sending Users:", users, "..."));
  res.status(200).json({ users: users });
  console.log(chalk.green(getTimestamp(), "Send Users successfully!"));
  return;
}

//turn whole app to typescript
//validate file first if right size, type etc., maybe look for way to check before loading on RAM
//make multer midleware to parse the file
//send file to ocr service, wait for response, send back to client