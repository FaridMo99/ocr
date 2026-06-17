import { X } from 'lucide-react';
import { type ReactNode } from 'react'
import { createPortal } from "react-dom";

type DialogLayoutProps = {
  children: ReactNode;
  closeButtonHandler: React.MouseEventHandler<HTMLButtonElement>;
  zValue: string;
};

function DialogLayout({
  children,
  closeButtonHandler,
  zValue,
}: DialogLayoutProps) {
  return createPortal(
    <div
      className={`w-screen h-screen bg-black fixed top-0 left-0 z-${zValue} overflow-hidden flex justify-center items-center`}
    >
      <button
        className="fixed top-2 left-2 flex justify-center items-center"
        aria-label="close dialog"
        onClick={closeButtonHandler}
      >
        <X className="text-white hover:text-white/80" size={60} />
      </button>
      <section className="w-[70vw] md:w-[50vw] min-h-[30vh] md:max-h-[75vh] max-h-[50vh] relative rounded-2xl dropzone text-start p-8 flex flex-col">
        {children}
      </section>
    </div>,
    document.getElementById("modal")!
  );
}

export default DialogLayout