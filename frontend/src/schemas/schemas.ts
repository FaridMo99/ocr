import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

export const fileSchema = z.object({
  files: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          "Each file must be under 10MB",
        )
        .refine(
          (file) => ACCEPTED_FILE_TYPES.includes(file.type),
          "Unsupported file format",
        ),
    )
    .min(1, "At least one file is required"),
});

export type FileList = z.infer<typeof fileSchema>;
