import dotenv from "dotenv"
import express from "express"
import chalk from "chalk"
import router from "./routes/router.js";
import dotenv from "dotenv"

dotenv.config()

export const getTimestamp = () => `[${new Date().toISOString().replace("T", ", ").replace("Z", "")}]`;

const app = express()
const PORT = process.env.PORT | 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/",router)


const server = app.listen(PORT, () => {
  console.log(chalk.green(`${getTimestamp()} Server running on Port: ${PORT}`));
});


server.on("error", (err) => {
  console.error(
    chalk.red(`${getTimestamp()} Server failed to start: ${err.message}`),
  );
});


process.on("uncaughtException", (err) => {
    console.log(chalk.red("Uncaught Exception:", err))
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
   console.log(chalk.red(getTimestamp(), "Unhandled Rejection:", err))
   process.exit(1);
});
process.on("SIGINT", () => {
   console.log(chalk.red(getTimestamp(), "SIGINT"))
   process.exit(1);
});
process.on("SIGTERM", () => {
    console.log(chalk.yellow(getTimestamp(), "SIGTERM"))
    process.exit(0);
});

process.on("exit", (code) => {
    if (code === 1) {
            console.log(
              chalk.red(getTimestamp(), `Process exited with code: ${code}`),
            );

    }

    if (code === 0) {
          console.log(
            chalk.blue(getTimestamp(), `Process exited with code: ${code}`),
          );
    }
    
    process.exit(code)
});    