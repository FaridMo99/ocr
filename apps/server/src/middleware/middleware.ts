import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { generateJwt } from "../utils/utils.js";
import path from "path";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/tiff",
  "image/bmp",
];

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },

  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isAllowedMime = ALLOWED_TYPES.includes(file.mimetype);
    const isAllowedExt = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'].includes(ext);
    
    if (isAllowedMime || isAllowedExt) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }
});

export function addJwtToken(req:Request, _res:Response, next:NextFunction) {
  const token = generateJwt()
  req.jwtHeader = `Bearer ${token}`;

  next();
};