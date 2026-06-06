import { Router } from "express";
import { processFile } from "../../controller/ocr.js";
import { addJwtToken, upload } from "../../middleware/middleware.js";

const v1Router = Router();

v1Router.post("ocr", upload.array("files",10), addJwtToken, await processFile);

export default v1Router;
