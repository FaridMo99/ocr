import { BACKEND_URL } from "./env";
import { type FileList } from "../schemas/schemas";

export type ProcessedResponse = {
  filename: string
  fileContent:string
}

export async function sendFile(files: FileList): Promise<ProcessedResponse[]> {
  const formData = new FormData();

  files.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }

  return await response.json();
}
