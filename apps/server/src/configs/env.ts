import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const FRONTEND_URL = process.env.FRONTEND_URL!;
export const OCR_URL = process.env.OCR_URL!;
export const JWT_SECRET = process.env.JWT_SECRET!;
