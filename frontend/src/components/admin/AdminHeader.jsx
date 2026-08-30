import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

/**
 * Fonts: Fraunces (display), IBM Plex Sans (UI text), IBM Plex Mono (date).
 * Matches the Order Operations dashboard and order detail pages. If fonts
 * are already loaded globally, move this @import to your base CSS and drop
 * the <style> tag below.
 */
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const INK = "#1C2A24";
const BRASS = "#A9822F";

const AdminHeader = () => {
  const user = JSON.parse(localStorage.getItem("estele_admin_user") || "null");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(tick);
  }, []);

  const today = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });

  const initial = user?.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <header style={{ fontFamily: "'IBM Plex Sans', sans-serif" }} className="h-[76px] border-b border-[#E4DFD3] bg-white">
      <style>{FONT_IMPORT}</style>

      <div className="flex h-full items-center justify-between px-5 sm:px-8 lg:px-10">
        <div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[11px] uppercase tracking-[1.2px] text-[#8A8577]">
            {today}
          </p>

          <h1 style={{ fontFamily: "'Fraunces', serif" }} className="mt-1 text-[20px] italic leading-none tracking-[-0.2px] text-[#1C2A24]">
            Welcome back, {user?.name || "Administrator"}
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#6B6656] transition-colors hover:text-[#A9822F]"
            style={{ backgroundColor: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7F5EF")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Bell size={18} strokeWidth={1.6} />
          </button>

          <div className="hidden h-7 w-px bg-[#E4DFD3] sm:block" />

          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-medium text-white ring-2 ring-offset-2"
              style={{ backgroundColor: INK, ringColor: BRASS, "--tw-ring-color": BRASS }}
            >
              {initial}
            </div>

            <div className="hidden sm:block">
              <p className="text-[13px] font-medium text-[#1C2A24]">
                {user?.name || "Administrator"}
              </p>
              <p style={{ color: BRASS }} className="text-[11px] font-medium uppercase tracking-[0.6px]">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
