import UploadInfo from "./UploadInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { fileSchema, type FileList } from "../../../../schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { sendFile } from "../../../../utils/sendFile";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import { useRef } from "react";
import FileLis from "../FileList";
import LoadingScreen from "../../response/LoadingScreen";
import { useNavigate } from "react-router-dom";

function UploadCard() {
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FileList>({
    resolver: zodResolver(fileSchema),
  });

  const files = useWatch({ control, name: "files" }) || [];
  const navigate = useNavigate()

  const {
    mutate: fileSubmit,
    isPending: fileIsPending,
  } = useMutation({
    mutationFn: sendFile,
    mutationKey: ["send files", files],
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (processedFiles) => {
      navigate("/response", { state: { processedFiles } });
    }
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    const updatedFiles = [...files, ...newFiles];

    setValue("files", updatedFiles, {
      shouldValidate: true,
    });
  }

  function submitHandler(files: FileList) {
    fileSubmit(files);
  }

  return (
    <>
      <div className="w-full">
        <form
          id="fileUploadForm"
          className="dropzone relative group mt-12 w-full cursor-pointer rounded-2xl p-10"
          onClick={() => fileRef.current?.click()}
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            {...register("files")}
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <UploadInfo />
          {(errors.files?.message ||
            (Array.isArray(errors.files) &&
              errors.files.find((e) => e?.message))) && (
            <p className="text-red-500 mt-2">
              {/* @ts-expect-error: Logic handles both FieldError and array of FieldErrors */}
              {errors.files?.message ||
                (Array.isArray(errors.files) &&
                  errors.files.find((e) => e?.message)?.message)}
            </p>
          )}
        </form>
      </div>
      {files.length > 0 && (
        <SubmitButton formName="fileUploadForm" isPending={fileIsPending} />
      )}
      <FileLis setFiles={setValue} files={files} />
      {fileIsPending && <LoadingScreen />}
    </>
  );
}
export default UploadCard;
