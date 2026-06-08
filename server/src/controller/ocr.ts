import chalk from "chalk";
import { Request, Response } from "express";
import { getTimestamp } from "../app.js";
import { OCR_URL } from "../configs/env.js";
import { OcrResponse } from "../types.js";

const ocrProcessingEndpoint = `${OCR_URL}/api/v1/ocr/process`

export async function processFile(req:Request, res:Response) {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const formData = new FormData();
    const jwtHeader = req.jwtHeader;

    files.forEach((file) => {
      const fileBlob = new Blob([new Uint8Array(file.buffer)], {
        type: file.mimetype,
      });

      formData.append("files", fileBlob, file.originalname);
    });

    const ocrResponse = await fetch(ocrProcessingEndpoint, {
      method: "POST",
      headers: {
        Authorization: jwtHeader,
      },
      body: formData,
    });

    if (!ocrResponse.ok) {
      throw new Error(`OCR service responded with ${ocrResponse.status}`);
    }

    const data: OcrResponse[] = await ocrResponse.json();

    console.log("data:",data)

    //check later if correct format
    res.status(200).json(data);
    console.log(chalk.green(getTimestamp(), "Send Users successfully!"));
    return;
  } catch (error) {
    console.log(getTimestamp(), "Processing failed, reason:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}