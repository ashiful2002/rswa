import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import "./index.css";
import "./styles/animations.css";
import "bootstrap/dist/css/bootstrap.min.css";

import About from "./Pages/About.jsx";
import Blog from "./Pages/Blog.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Blood from "./Pages/Blood.jsx";
import OtherLinks from "./Pages/OtherLinks.jsx";
import BgForm1 from "./Components/Form/BgForm1.jsx";
import Donate from "./Pages/Donate.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import CustomForm from "./Components/Form/CustomForm.jsx";
import RootLayout from "./Layout/RootLayout/RootLayout.jsx";
import Signin from "./Pages/SignIn/Signin.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import DashboardBlood from "./Pages/Dashboard/Blood/DashboardBlood.jsx";
import DashboardStat from "./Pages/Dashboard/DashBoardStat/DashboardStat.jsx";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout/DashboardLayout.jsx";
import DashboardUserManagement from "./Pages/Dashboard/DashboardUserManagement.jsx";
import DashboardContent from "./Pages/Dashboard/DashboardContent.jsx";
import Archives from "./Pages/archives/Archives.jsx";
import PrivateRoute from "./Components/ProtectedRoutes/privateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/archives",
        element: <Archives />,
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
        path: "/numbers",
        element: <OtherLinks />,
      },
      {
        path: "/add-bg",
        element: <CustomForm />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      // {
      //   path: "/otherLinks",
      //   element: <OtherLinks />,
      // },
      {
        path: "/bgForm1",
        element: <BgForm1 />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardStat />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-blood",
        // here have to use private route
        element: (
          <PrivateRoute>
            <DashboardBlood />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <DashboardUserManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "content",
        element: (
          <PrivateRoute>
            <DashboardContent />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
