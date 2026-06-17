import { BACKEND_URL } from "./env";
import { type FileList } from "../schemas/schemas";

export type ProcessedResponse = {
  filename: string
  content:string
}

const ocrUrl = `${BACKEND_URL}/api/v1/ocr`

export async function sendFile(files: FileList): Promise<ProcessedResponse[]> {
  const formData = new FormData();

  files.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(ocrUrl, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }

  return await response.json();
}
