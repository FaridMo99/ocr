import chalk from "chalk";
import { getTimestamp } from "../../app.js";
import { OCR_URL } from "../configs/env.js";

export async function processFile(req, res) {
  try {
    const files = req.files;
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });

    const ocrResponse = await fetch(OCR_URL, {
      method: "POST",
      body: formData,
    });

    if (!ocrResponse.ok) {
      throw new Error(`OCR service responded with ${ocrResponse.status}`);
    }

    const data = await ocrResponse.json();

    //check later if correct format
    res.status(200).json(data);
    console.log(chalk.green(getTimestamp(), "Send Users successfully!"));
    return;
  } catch (error) {
    console.log(getTimestamp(), "Processing failed, reason:", error)
    return res.status(500).json({message:"Internal Server Error"})
  }
}

//turn whole app to typescript