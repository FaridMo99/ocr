import InfoButton from "./InfoButton";
import MainText from "./MainText";
import SubText from "./SubText";
import UploadCard from "./UploadCard";

function FileUpload() {
  return (
    <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-24">
      <InfoButton text="OCR Image Processing" />
      <MainText />
      <SubText />
      <UploadCard />
    </section>
  );
}

export default FileUpload;
