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

const router = createBrowserRouter([
  {
    path: "/",
    element: <BsNavbar />,
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
        path: "/bgForm",
        element: <GFormBloog />,
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
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
