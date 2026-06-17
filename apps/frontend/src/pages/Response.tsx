import { useLocation } from "react-router-dom"
import ProcessedList from "../components/ui/response/ProcessedList"

function Response() {
    const location = useLocation()
    const { processedFiles } = location.state || []

    if (processedFiles.length === 0) return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-2xl">
        No Files found...
      </div>
    );

  return <ProcessedList processedFiles={processedFiles} />
}

export default Response