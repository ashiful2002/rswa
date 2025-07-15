import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BsNavbar from "./Layout/BsNAvbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Pages/About.jsx";
import Blog from "./Pages/Blog.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Blood from "./Pages/Blood.jsx";
import GFormBloog from "./Pages/Components/GFormBloog.jsx";
import OtherLinks from "./Pages/OtherLinks.jsx";
import BgForm1 from "./Components/Form/BgForm1.jsx";
import Donate from "./Pages/Donate.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import CustomForm from "./Components/Form/CustomForm.jsx";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BsNavbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/Blog",
        element: <Blog />,
      },
      {
        path: "/blood",
        element: <Blood />,
      },
      {
        path: "/add-bg",
        element: <CustomForm />,
        // element: <GFormBloog />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/otherLinks",
        element: <OtherLinks />,
      },
      {
        path: "/bgForm1",
        element: <BgForm1 />,
      },
      {
        path: "/signin",
        // element: <Signin />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
);
