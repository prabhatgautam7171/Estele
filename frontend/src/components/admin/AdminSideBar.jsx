import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tags,
  LogOut,
} from "lucide-react";
import { adminLogout } from "../../api/adminAuth";
// NOTE: fixed — was an absolute local machine path, which breaks on any
// other machine or in a build. Adjust if your assets folder differs.
import logo from "../../assets/logo.webp";

/**
 * Fonts: IBM Plex Sans (UI text), IBM Plex Mono (eyebrow label). Matches the
 * Order Operations dashboard, header, and order detail pages. If fonts are
 * already loaded globally, move this @import to your base CSS and drop the
 * <style> tag below.
 */
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const INK = "#1C2A24";
const INK_LIGHT = "#26362F"; // one step up from INK, for active-row fill
const BRASS = "#A9822F";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.error("Admin logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/admin/login", { replace: true });
    }
  };

  const links = [
    { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Categories", path: "/admin/categories", icon: Tags },
  ];

  return (
    <aside
      style={{ backgroundColor: INK, fontFamily: "'IBM Plex Sans', sans-serif" }}
      className="hidden w-[230px] shrink-0 lg:flex lg:flex-col"
    >
      <style>{FONT_IMPORT}</style>

      {/* Logo */}
      <div className="flex items-center justify-center border-b border-white/10 px-6 py-6">
        <div className=" px-4 py-2">
          <img src={logo} alt="Estele" className="h-[36px] w-auto object-contain" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p
          style={{ fontFamily: "'IBM Plex Mono', monospace", color: BRASS }}
          className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[1.6px]"
        >
          Store
        </p>

        <div className="space-y-0.5">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 border-l-2 py-2.5 pl-4 pr-3 text-[14px] transition-colors ${
                    isActive
                      ? "border-l-[#A9822F] font-medium text-[#F7F5EF]"
                      : "border-l-transparent text-[#F7F5EF]/55 hover:border-l-white/20 hover:text-[#F7F5EF]/90"
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? INK_LIGHT : "transparent",
                })}
              >
                <Icon size={17} strokeWidth={1.7} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[8px] px-4 py-2.5 text-[14px] text-[#E39E8C] transition-colors hover:bg-white/5 hover:text-[#F2B7A6]"
        >
          <LogOut size={17} strokeWidth={1.7} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
