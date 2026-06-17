import express from "express";
import chalk from "chalk";
import cors from "cors";
import { FRONTEND_URL } from "./configs/env.js";
import { PORT } from "./configs/env.js";
import apiRouter from "./routes/api.js";


export const getTimestamp = () =>
  `[${new Date().toISOString().replace("T", ", ").replace("Z", "")}]`;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);

const server = app.listen(PORT, () => {
  console.log(chalk.green(`${getTimestamp()} Server running on Port: ${PORT}`));
});

server.on("error", (err) => {
  console.error(
    chalk.red(`${getTimestamp()} Server failed to start: ${err.message}`),
  );
});

process.on("uncaughtException", (err) => {
  console.log(chalk.red("Uncaught Exception:", err));
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(chalk.red(getTimestamp(), "Unhandled Rejection:", err));
  process.exit(1);
});
process.on("SIGINT", () => {
  console.log(chalk.red(getTimestamp(), "SIGINT"));
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log(chalk.yellow(getTimestamp(), "SIGTERM"));
  process.exit(0);
});

process.on("exit", (code) => {
  if (code === 1) {
    console.log(chalk.red(getTimestamp(), `Process exited with code: ${code}`));
  }

  if (code === 0) {
    console.log(
      chalk.blue(getTimestamp(), `Process exited with code: ${code}`),
    );
  }

  process.exit(code);
});
