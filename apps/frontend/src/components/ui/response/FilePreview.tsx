import { useState } from "react";
import type { ProcessedResponse } from "../../../utils/sendFile";
import FileCard from "./FileCard";
import { FileText } from "lucide-react";

type FilePreviewProps = {
  file: ProcessedResponse;
};

function FilePreview({ file }: FilePreviewProps) {
  const [showCard, setShowCard] = useState<boolean>(false);
  return (
    <>
      <li
        className="flex items-center justify-between rounded-xl border border-border/60 bg-card/50 px-4 py-3 backdrop-blur cursor-pointer hover:bg-card/20"
        onClick={()=>setShowCard(true)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <FileText className="h-4 w-4 shrink-0 text-primary" />
          <p className="truncate text-sm">{file.filename}</p>
        </div>
      </li>
      {showCard && <FileCard fileResponse={file} showCard={setShowCard} />}
    </>
  );
}

export default FilePreview;
