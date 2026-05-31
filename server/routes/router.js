import { Router } from "express";
import { createUser, getUsers } from "../controller/root.js";

const router = Router();

router.get("/", getUsers)

router.post("/", createUser)


export default router