import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Glow from "./Glow";

function MainLayout() {
  return (
    <>
      <Header />
      <Glow />
      <main className="relative min-h-screen overflow-hidden">
        <Outlet />
        <Toaster position="bottom-right" />
      </main>
    </>
  );
}

export default MainLayout;
