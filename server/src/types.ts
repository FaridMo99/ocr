
declare global {
  namespace Express {
    interface Request {
      jwtHeader: string;
      files?: Express.Multer.File[];
    }
  }
}

export type ClientResponseOcr = {
  filename: string;
  fileContent: string;
};
