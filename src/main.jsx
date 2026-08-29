import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import "./index.css";
import "./styles/animations.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./Layout/RootLayout/RootLayout.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import AdminRoute from "./Components/ProtectedRoutes/AdminRoute.jsx";
import ThemeProvider from "./Context/ThemeProvider.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";

// Lazy-loaded pages for optimized performance and bundle splitting
const About = lazy(() => import("./Pages/About.jsx"));
const Blog = lazy(() => import("./Pages/Blog.jsx"));
const Blood = lazy(() => import("./Pages/Blood.jsx"));
const OtherLinks = lazy(() => import("./Pages/OtherLinks.jsx"));
const BgForm1 = lazy(() => import("./Components/Form/BgForm1.jsx"));
const Donate = lazy(() => import("./Pages/Donate.jsx"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp.jsx"));
const CustomForm = lazy(() => import("./Components/Form/CustomForm.jsx"));
const RCL = lazy(() => import("./Pages/RCL/RCL.jsx"));
const StudentAward = lazy(
  () => import("./Pages/StudentAward/StudentAward.jsx"),
);
const AdmissionForm = lazy(
  () => import("./Pages/StudentAward/AdmissionForm.jsx"),
);
const Signin = lazy(() => import("./Pages/SignIn/Signin.jsx"));
const Projects = lazy(() => import("./Pages/Projects/Projects.jsx"));

// Lazy-loaded Dashboard pages
const DashboardLayout = lazy(
  () => import("./Pages/Dashboard/DashboardLayout/DashboardLayout.jsx"),
);
const DashboardStat = lazy(
  () => import("./Pages/Dashboard/DashBoardStat/DashboardStat.jsx"),
);
const DashboardBlood = lazy(
  () => import("./Pages/Dashboard/Blood/DashboardBlood.jsx"),
);
const DashboardStudentAward = lazy(
  () => import("./Pages/Dashboard/StudentAward/DashboardStudentAward.jsx"),
);
const DashboardProjects = lazy(
  () => import("./Pages/Dashboard/Projects/DashboardProjects.jsx"),
);
const DashboardUserManagement = lazy(
  () => import("./Pages/Dashboard/DashboardUserManagement.jsx"),
);
const DashboardContent = lazy(
  () => import("./Pages/Dashboard/DashboardContent.jsx"),
);

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
        path: "/student-award/forms/admission",
        element: <AdmissionForm />,
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
    errorElement: <ErrorPage />,
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
        path: "student-award",
        element: <DashboardStudentAward />,
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
