import {createBrowserRouter} from "react-router-dom"
import MainLayout from "../layouts/main/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Response from "../pages/Response";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "response",
        element: <Response />,
      },
    ],
  },
]);


export default router