import { Router } from "express";
import { createUser, getUsers } from "../../controller/root.js";

const v1Router = Router();

v1Router.get("ocr", getUsers);

export default v1Router;
