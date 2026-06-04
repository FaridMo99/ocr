import { Upload } from "lucide-react";

function UploadInfo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30 transition group-hover:bg-primary/15 group-hover:ring-primary/50">
        <Upload className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="font-display text-lg font-medium text-primary">
          Drop a file here
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          PNG, JPG, JPEG or PDF · up to 10MB
        </p>
      </div>
    </div>
  );
}

export default UploadInfo;
