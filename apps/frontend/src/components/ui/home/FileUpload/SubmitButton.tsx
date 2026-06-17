import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  isPending: boolean;
  formName: string;
};
function SubmitButton({ isPending, formName }: SubmitButtonProps) {
  return (
    <div className="w-full mt-5 flex justify-end items-center">
      <button
        form={formName}
        disabled={isPending}
        className="rounded ring-1 ring-primary/50  text-primary cursor-pointer bg-primary/10 font-medium px-2 py-1"
        type="submit"
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
      </button>
    </div>
  );
}

export default SubmitButton;
