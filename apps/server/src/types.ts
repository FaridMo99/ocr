
declare global {
  namespace Express {
    interface Request {
      jwtHeader: string;
      files?: Express.Multer.File[];
    }
  }
}

export type OcrResponse = {
  filename: string;
  content: string;
};
