import { FileText, ImageIcon, X } from "lucide-react";
import type { UseFormSetValue } from "react-hook-form";

type FileListProps = {
  files: File[];
  setFiles: UseFormSetValue<{ files: File[] }>;
};

function FileList({ files, setFiles }: FileListProps) {
  return (
    <>
      {files.length > 0 && (
        <ul className="mt-6 w-full space-y-2 text-left">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-card/50 px-4 py-3 backdrop-blur"
            >
              <div className="flex min-w-0 items-center gap-3">
                {f.type.startsWith("image/") ? (
                  <ImageIcon className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <FileText className="h-4 w-4 shrink-0 text-primary" />
                )}
                <span className="truncate text-sm">{f.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {(f.size / 1024).toFixed(0)} KB
                </span>
              </div>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedFiles = files.filter((_, index) => index !== i);
                  setFiles("files", updatedFiles, { shouldValidate: true });
                }}
                className="rounded-md p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default FileList;
