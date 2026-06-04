import { Router } from "express";
import { processFile } from "../../controller/ocr.js";
import { upload } from "../../middleware/validation.js";

const v1Router = Router();

v1Router.post("ocr", upload.array("files",10), await processFile);

export default v1Router;
