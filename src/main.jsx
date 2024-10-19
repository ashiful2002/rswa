import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/index.jsx";
import CoppiedNav from "./Layout/CoppiedNav.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CoppiedNav />,
    children: [
      {
        path: "/",
        element:< App/>
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    {/* <App /> */}
  </StrictMode>
);
