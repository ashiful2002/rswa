import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, LogOut, BarChart3, Users, Droplet, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navigationItems = [
    { path: "/dashboard", label: "Statistics", icon: <BarChart3 className="h-5 w-5" /> },
    { path: "/dashboard/manage-blood", label: "Manage Blood", icon: <Droplet className="h-5 w-5" /> },
    { path: "/dashboard/users", label: "User Management", icon: <Users className="h-5 w-5" /> },
    { path: "/dashboard/content", label: "Content", icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } border-r border-border bg-card shadow-sm transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
              R
            </div>
            {isOpen && <span className="font-bold text-foreground">RSWA</span>}
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 w-8"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`
              }
            >
              {item.icon}
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <Separator />

        {/* Footer */}
        <div className="p-4">
          <NavLink to="/">
            <Button variant="outline" className="w-full justify-start gap-2" size="sm">
              <LogOut className="h-4 w-4" />
              {isOpen && <span>Back Home</span>}
            </Button>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="border-b border-border bg-card shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
