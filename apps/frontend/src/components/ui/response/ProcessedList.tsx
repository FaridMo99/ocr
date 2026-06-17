import type { ProcessedResponse } from "../../../utils/sendFile";
import FilePreview from "./FilePreview";

type ProcessedListProps = {
  processedFiles: ProcessedResponse[];
};

function ProcessedList({ processedFiles }: ProcessedListProps) {
  return (
      <ul className="mt-6 w-full space-y-2 text-left px-6">
        {processedFiles.map(file => <FilePreview key={file.content} file={file} />)}
      </ul>
  );
}

export default ProcessedList;
