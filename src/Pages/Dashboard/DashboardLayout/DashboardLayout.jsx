import { useState, Suspense } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  BarChart3,
  Users,
  Droplet,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole/UseUserRole";
import ThemeToggle from "../../../Components/shared/ThemeToggle";
import Loading from "../../../Components/Loading/Loading";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();
  const { role } = useUserRole();
  const location = useLocation();

  const navigationItems = [
    {
      path: "/dashboard",
      label: "Statistics",
      icon: BarChart3,
      end: true,
    },
    {
      path: "/dashboard/manage-blood",
      label: "Manage Blood",
      icon: Droplet,
    },
    {
      path: "/dashboard/student-award",
      label: "Student Award",
      icon: GraduationCap,
    },
    {
      path: "/dashboard/projects",
      label: "Manage Projects",
      icon: FolderKanban,
    },
    ...(role === "super_admin" || role === "admin"
      ? [
          {
            path: "/dashboard/users",
            label: "User Management",
            icon: Users,
          },
        ]
      : []),
    {
      path: "/dashboard/content",
      label: "Content",
      icon: FileText,
    },
  ];

  // Map route path to human title
  const getPageTitle = () => {
    if (location.pathname === "/dashboard/manage-blood")
      return "Manage Blood Donors";
    if (location.pathname === "/dashboard/student-award")
      return "Student Award Applicants";
    if (location.pathname === "/dashboard/projects")
      return "Manage Projects & Initiatives";
    if (location.pathname === "/dashboard/users") return "User Management";
    if (location.pathname === "/dashboard/content") return "Content Management";
    return "Dashboard Overview";
  };

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="backdrop-blur-xs fixed inset-0 z-40 bg-slate-900/60 transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar (Responsive Mobile Drawer + Desktop Sidebar) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
          isMobileOpen ? "w-64 translate-x-0 shadow-2xl" : "-translate-x-full"
        } lg:static lg:translate-x-0 ${isSidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        {/* Sidebar Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <Link
            to="/"
            onClick={closeMobileSidebar}
            className="group flex items-center gap-3 no-underline"
          >
            <img
              src={logo}
              alt="RSWA Logo"
              className="h-9 w-9 rounded-lg object-contain transition-transform group-hover:scale-105"
            />
            {(isSidebarOpen || isMobileOpen) && (
              <div className="flex flex-col">
                <span className="text-base font-bold leading-tight tracking-tight text-slate-800 dark:text-white">
                  RSWA Admin
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Management
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none dark:hover:bg-slate-800 lg:flex"
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={closeMobileSidebar}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {(isSidebarOpen || isMobileOpen) && (
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>
          )}

          {navigationItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold no-underline transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <IconComponent className="h-4 w-4 shrink-0" />
                {(isSidebarOpen || isMobileOpen) && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer User Info & Exit */}
        <div className="space-y-2 border-t border-slate-200 p-3 dark:border-slate-800">
          {/* User Profile Summary */}
          {user && (isSidebarOpen || isMobileOpen) && (
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800/60">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : user.email
                      ? user.email.charAt(0).toUpperCase()
                      : "A"}
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-xs font-bold text-slate-800 dark:text-white">
                  {user.displayName || "Admin User"}
                </span>
                <span className="truncate text-[10px] text-slate-500">
                  {role || "Administrator"}
                </span>
              </div>
            </div>
          )}

          {/* Back to main website link */}
          <Link
            to="/"
            onClick={closeMobileSidebar}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 no-underline transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-emerald-950/40"
          >
            <Home className="h-4 w-4 shrink-0 text-emerald-600" />
            {(isSidebarOpen || isMobileOpen) && <span>Back to Main Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Top Header Bar */}
        <header className="shadow-xs /95 sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <h1 className="truncate text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 py-1 pl-1 pr-3 no-underline transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800"
                title="Go to Dashboard Overview"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User Avatar"}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                  />
                ) : (
                  <div className="shadow-xs flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {(user.displayName || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="max-w-[110px] truncate text-xs font-bold text-slate-800 dark:text-white sm:max-w-[160px]">
                    {user.displayName || user.email?.split("@")[0] || "User"}
                  </span>
                  <span
                    className={`py-0.2 inline-block self-start rounded-full px-2 text-[9px] font-extrabold uppercase tracking-wider ${
                      role === "super_admin"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300"
                        : role === "admin"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                          : role === "moderator"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                    }`}
                  >
                    {role ? role.replace("_", " ") : "Donor"}
                  </span>
                </div>
              </Link>
            )}

            <ThemeToggle />
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 no-underline transition-colors hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 md:flex"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Website</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Route Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
