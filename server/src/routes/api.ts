import { Router } from "express";
import v1Router from "./version/v1.js";

const apiRouter = Router();

apiRouter.use(v1Router);


export default apiRouter;