import { Loader2 } from "lucide-react";
import { useEffect } from "react";

function LoadingScreen() {

      useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "unset";
        };
      }, []);
  
  return (
    <div className="w-screen h-screen bg-black/90 overflow-hidden z-100 fixed top-0 left-0 flex justify-center items-center">
      <Loader2 className="animate-spin text-primary" size={200} />
    </div>
  );
}

export default LoadingScreen;
