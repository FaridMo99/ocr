import { Clipboard } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { ProcessedResponse } from "../../../utils/sendFile";
import DialogLayout from "./DialogLayout";

type FileCardProps = {
  fileResponse: ProcessedResponse;
  showCard: React.Dispatch<React.SetStateAction<boolean>>;
};

function FileCard({ fileResponse, showCard }: FileCardProps) {
  async function clickHandler() {
    try {
      await navigator.clipboard.writeText(fileResponse.fileContent);
      toast.success("Copied to Clipboard");
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong, try Again!");
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <DialogLayout
      zValue="100"
      closeButtonHandler={() => showCard(false)}
    >
      <div className="overflow-y-scroll flex-1 pr-4">
        <p>{fileResponse.fileContent}</p>
      </div>
      <button
        aria-label="copy to clipboard"
        onClick={clickHandler}
        className="absolute top-8 right-8"
      >
        <Clipboard className="w-6 text-white hover:text-white/80" />
      </button>
    </DialogLayout>
  );
}

export default FileCard;
