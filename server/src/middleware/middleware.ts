import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { generateJwt } from "../utils/utils.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg"
];

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export function addJwtToken(req:Request, _res:Response, next:NextFunction) {
  const token = generateJwt()
  req.jwtHeader = `Bearer ${token}`;

  next();
};