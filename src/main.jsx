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
import RCL from "./Pages/RCL/RCL.jsx";
import StudentAward from "./Pages/StudentAward/StudentAward.jsx";
import Signin from "./Pages/SignIn/Signin.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import DashboardBlood from "./Pages/Dashboard/Blood/DashboardBlood.jsx";
import DashboardStat from "./Pages/Dashboard/DashBoardStat/DashboardStat.jsx";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout/DashboardLayout.jsx";
import DashboardUserManagement from "./Pages/Dashboard/DashboardUserManagement.jsx";
import DashboardContent from "./Pages/Dashboard/DashboardContent.jsx";
import DashboardProjects from "./Pages/Dashboard/Projects/DashboardProjects.jsx";
import Projects from "./Pages/Projects/Projects.jsx";
import AdminRoute from "./Components/ProtectedRoutes/AdminRoute.jsx";

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
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:slug",
        element: <Projects />,
      },
      {
        path: "/archives",
        element: <Projects />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/rcl",
        element: <RCL />,
      },
      {
        path: "/student-award",
        element: <StudentAward />,
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
      {
        path: "numbers",
        element: <OtherLinks />,
      },
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
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardStat />,
      },
      {
        path: "manage-blood",
        element: <DashboardBlood />,
      },
      {
        path: "projects",
        element: <DashboardProjects />,
      },
      {
        path: "users",
        element: <DashboardUserManagement />,
      },
      {
        path: "content",
        element: <DashboardContent />,
      },
    ],
  },
]);
import ThemeProvider from "./Context/ThemeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
