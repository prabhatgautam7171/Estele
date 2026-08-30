import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ShoppingBag,
  Clock3,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAdminOrders } from "../../api/adminOrders";

/**
 * Fonts: Fraunces (display / hero numerals), IBM Plex Sans (UI text),
 * IBM Plex Mono (order codes, timestamps, amounts — the "ledger" voice).
 * If your app already loads fonts globally, move this @import to your
 * base CSS and delete the <style> block below.
 */
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const INK = "#1C2A24";
const PAPER = "#F7F5EF";
const LINE = "#E4DFD3";
const BRASS = "#A9822F";

const STATUS_META = {
  pending: { label: "Pending", color: "#B8863B" },
  confirmed: { label: "Confirmed", color: "#3F5670" },
  processing: { label: "Processing", color: "#3F5670" },
  shipped: { label: "Shipped", color: "#4B7A63" },
  delivered: { label: "Delivered", color: "#2E5943" },
  cancelled: { label: "Cancelled", color: "#A84438" },
};

const FUNNEL_STEPS = ["pending", "processing", "shipped", "delivered"];

const Dashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());

  // Live clock — small, real detail that keeps the masthead from feeling static.
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminOrders();
      const ordersData = response?.orders || response?.data || [];

      const normalizedOrders = Array.isArray(ordersData)
        ? ordersData.map((order) => ({
          ...order,
          total_amount: Number(order.total_amount) || 0,
        }))
        : [];

      setOrders(normalizedOrders);
    } catch (err) {
      console.error("Failed to load admin orders:", err);
      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ---------- derived data ----------

  const stats = useMemo(() => {
    const counts = {};
    Object.keys(STATUS_META).forEach((key) => {
      counts[key] = orders.filter((o) => o.status === key).length;
    });
    return counts;
  }, [orders]);

  const totalOrders = orders.length;

  const totalRevenue = useMemo(
    () =>
      orders
        .filter((o) => o.status?.toLowerCase() === "delivered")
        .reduce((sum, o) => sum + Number(o.total_amount || 0), 0),
    [orders]
  );

  const avgOrderValue = useMemo(() => {
    if (!totalOrders) return 0;

    const sum = orders.reduce(
      (s, o) => s + Number(o.total_amount || 0),
      0
    );

    return sum / totalOrders;
  }, [orders, totalOrders]);

  const ordersToday = useMemo(() => {
    return orders.filter((o) => {
      if (!o.created_at) return false;
      const c = new Date(o.created_at);
      return (
        c.getDate() === now.getDate() &&
        c.getMonth() === now.getMonth() &&
        c.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [orders, now]);

  const completionRate = totalOrders
    ? Math.round((stats.delivered / totalOrders) * 100)
    : 0;

  // Order funnel — proportion of the live pipeline, not a decorative chart.
  const funnel = useMemo(() => {
    const pipelineTotal =
      FUNNEL_STEPS.reduce((s, key) => s + (stats[key] || 0), 0) || 1;
    return FUNNEL_STEPS.map((key) => ({
      key,
      ...STATUS_META[key],
      count: stats[key] || 0,
      pct: Math.round(((stats[key] || 0) / pipelineTotal) * 1000) / 10,
    }));
  }, [stats]);

  // 7-day delivered-revenue sparkline, computed from real order timestamps.
  const revenueTrend = useMemo(() => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);

      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);

      days.push(d);
    }

    const totals = days.map((day) => {
      const next = new Date(day);

      next.setDate(next.getDate() + 1);

      return orders
        .filter(
          (o) =>
            o.status?.toLowerCase() === "delivered" &&
            o.created_at
        )
        .filter((o) => {
          const c = new Date(o.created_at);

          return c >= day && c < next;
        })
        .reduce(
          (sum, o) => sum + Number(o.total_amount || 0),
          0
        );
    });

    return { days, totals };
  }, [orders, now]);

  const sparkline = useMemo(() => {
    const totals = revenueTrend.totals.map((value) =>
      Number.isFinite(Number(value)) ? Number(value) : 0
    );

    const max = Math.max(...totals, 1);

    const w = 260;
    const h = 56;
    const pad = 6;

    const points = totals.map((value, i) => {
      const x =
        totals.length > 1
          ? (i / (totals.length - 1)) * w
          : 0;

      const y =
        h -
        pad -
        (value / max) * (h - pad * 2);

      return [x, y];
    });

    const linePath = points
      .map(
        (p, i) =>
          `${i === 0 ? "M" : "L"}${p[0].toFixed(
            1
          )},${p[1].toFixed(1)}`
      )
      .join(" ");

    const areaPath =
      `M0,${h} ` +
      points
        .map(
          (p) =>
            `L${p[0].toFixed(1)},${p[1].toFixed(1)}`
        )
        .join(" ") +
      ` L${w},${h} Z`;

    return {
      linePath,
      areaPath,
      w,
      h,
    };
  }, [revenueTrend]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 8);
  }, [orders]);

  // ---------- formatters ----------

  const formatDate = (date) =>
    !date
      ? "—"
      : new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  const formatTime = (date) =>
    !date
      ? "—"
      : new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

  const formatAmount = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatOrderCode = (id) => `No. ${String(id ?? 0).padStart(6, "0")}`;

  const getCustomerName = (order) =>
    order.user?.name || order.user?.email || "Customer";

  const StatusTag = ({ status }) => {
    const meta = STATUS_META[status] || { label: status || "Unknown", color: "#6B7280" };
    return (
      <span className="inline-flex items-center gap-2 text-[12px] font-medium capitalize" style={{ color: meta.color }}>
        <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: meta.color }} />
        {meta.label}
      </span>
    );
  };

  const dayLabel = (d) => d.toLocaleDateString("en-IN", { weekday: "short" });

  // ---------- render ----------

  return (
    <div style={{ backgroundColor: PAPER, fontFamily: "'IBM Plex Sans', sans-serif", color: INK }} className="min-h-screen">
      <style>{FONT_IMPORT}</style>

      {/* Masthead */}
      <header style={{ backgroundColor: INK }} className="sticky top-0 z-10">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-4">
            <span
              style={{ fontFamily: "'Fraunces', serif" }}
              className="text-[22px] italic text-[#F7F5EF]"
            >
              Estele
            </span>
            <span className="h-4 w-px bg-[#F7F5EF]/25" />
            <span className="text-[11px] font-medium uppercase tracking-[2px] text-[#F7F5EF]/60">
              Order Operations
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: "#7FB99A" }} />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full" style={{ backgroundColor: "#7FB99A" }} />
              </span>
              <span className="text-[12px] text-[#F7F5EF]/70">System online</span>
            </div>

            <span
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="hidden text-[12px] tabular-nums text-[#F7F5EF]/70 md:inline"
            >
              {now.toLocaleTimeString("en-IN", { hour12: false })}
            </span>

            <button
              type="button"
              onClick={loadOrders}
              disabled={loading}
              className="flex items-center gap-2 rounded-full border border-[#F7F5EF]/20 px-4 py-2 text-[12px] font-medium text-[#F7F5EF] transition-colors hover:border-[#A9822F] hover:text-[#A9822F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10 md:py-10">
        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between border-l-2 px-5 py-3.5" style={{ borderColor: "#A84438", backgroundColor: "#FBF1EE" }}>
            <p className="text-[13px] text-[#7A2E20]">{error}</p>
            <button type="button" onClick={loadOrders} className="text-[12px] font-semibold uppercase tracking-[1px] text-[#A84438] hover:opacity-70">
              Retry
            </button>
          </div>
        )}

        {/* Hero: revenue + funnel */}
        <div className="mb-10 grid grid-cols-1 gap-px overflow-hidden border border-[#E4DFD3] bg-[#E4DFD3] lg:grid-cols-[1.1fr_1.4fr]">
          {/* Revenue statement */}
          <div className="bg-white p-7 md:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[1.6px] text-[#8A8577]">
              Revenue — Delivered Orders
            </p>

            {loading ? (
              <div className="mt-4 h-[52px] w-48 animate-pulse rounded bg-[#F3F1EA]" />
            ) : (
              <p style={{ fontFamily: "'Fraunces', serif" }} className="mt-2 text-[44px] leading-none tracking-[-0.5px] text-[#1C2A24] md:text-[50px]">
                {formatAmount(totalRevenue)}
              </p>
            )}

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-[11px] text-[#8A8577]">Last 7 days</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-1 text-[13px] tabular-nums text-[#1C2A24]">
                  {formatAmount(revenueTrend.totals.reduce((a, b) => a + b, 0))}
                </p>
              </div>

              <svg width={sparkline.w} height={sparkline.h} viewBox={`0 0 ${sparkline.w} ${sparkline.h}`} className="overflow-visible">
                <path d={sparkline.areaPath} fill={BRASS} opacity="0.08" />
                <path d={sparkline.linePath} fill="none" stroke={BRASS} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>

            <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-2 flex justify-between text-[10px] text-[#B4AF9F]">
              {revenueTrend.days.map((d, i) => (
                <span key={i}>{dayLabel(d)}</span>
              ))}
            </div>
          </div>

          {/* Pipeline funnel */}
          <div className="bg-white p-7 md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-[1.6px] text-[#8A8577]">
                Order Pipeline
              </p>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[12px] tabular-nums text-[#8A8577]">
                {totalOrders} total
              </span>
            </div>

            {/* segmented bar */}
            <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-[#F3F1EA]">
              {funnel.map((step) => (
                <div
                  key={step.key}
                  title={`${step.label}: ${step.count}`}
                  className="h-full transition-all duration-700 ease-out first:rounded-l-full last:rounded-r-full"
                  style={{ width: `${step.pct}%`, backgroundColor: step.color }}
                />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
              {funnel.map((step) => (
                <div key={step.key}>
                  <div className="flex items-center gap-1.5">
                    <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: step.color }} />
                    <span className="text-[11px] text-[#8A8577]">{step.label}</span>
                  </div>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-1 text-[20px] tabular-nums text-[#1C2A24]">
                    {loading ? "—" : step.count}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#EFEBE1] pt-5">
              <div>
                <p className="text-[10px] uppercase tracking-[1px] text-[#8A8577]">Completion</p>
                <p className="mt-1 text-[15px] font-semibold text-[#1C2A24]">{completionRate}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[1px] text-[#8A8577]">Avg. order</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-1 text-[15px] tabular-nums text-[#1C2A24]">
                  {formatAmount(avgOrderValue)}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[1px] text-[#8A8577]">Today</p>
                <p className="mt-1 text-[15px] font-semibold text-[#1C2A24]">{ordersToday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Manifest / order ledger */}
        <div className="border border-[#E4DFD3] bg-white">
          <div className="flex items-center justify-between border-b border-[#E4DFD3] px-6 py-5 md:px-8">
            <div>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-[19px] text-[#1C2A24]">
                Order Manifest
              </h2>
              <p className="mt-0.5 text-[12px] text-[#8A8577]">Most recent {recentOrders.length || 0} entries</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/orders")}
              className="group flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[1px]"
              style={{ color: BRASS }}
            >
              View all
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {loading ? (
            <div className="divide-y divide-[#F0EDE4]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-6 px-6 py-4 md:px-8">
                  <div className="h-3 w-16 animate-pulse rounded bg-[#F3F1EA]" />
                  <div className="h-3 flex-1 animate-pulse rounded bg-[#F3F1EA]" />
                  <div className="h-3 w-20 animate-pulse rounded bg-[#F3F1EA]" />
                </div>
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <ShoppingBag size={26} strokeWidth={1.3} style={{ color: "#C9C3B3" }} />
              <p style={{ fontFamily: "'Fraunces', serif" }} className="mt-4 text-[17px] text-[#1C2A24]">
                The manifest is empty
              </p>
              <p className="mt-1 max-w-[280px] text-[13px] text-[#8A8577]">
                Orders will be logged here as soon as customers check out.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block">
                <div
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  className="grid grid-cols-[90px_1.6fr_1fr_1fr_1fr_1fr] border-b border-[#E4DFD3] px-8 py-3 text-[10px] uppercase tracking-[1.2px] text-[#B4AF9F]"
                >
                  <span>Line</span>
                  <span>Customer</span>
                  <span>Order</span>
                  <span>Logged</span>
                  <span className="text-right">Amount</span>
                  <span className="text-right">Status</span>
                </div>

                <div className="divide-y divide-[#F0EDE4]">
                  {recentOrders.map((order, idx) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="group grid w-full grid-cols-[90px_1.6fr_1fr_1fr_1fr_1fr] items-center px-8 py-4 text-left transition-colors hover:bg-[#FAF8F3]"
                    >
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[12px] text-[#B4AF9F]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <p className="text-[13px] font-medium text-[#1C2A24] group-hover:underline">
                          {getCustomerName(order)}
                        </p>
                        {order.user?.email && (
                          <p className="mt-0.5 text-[11px] text-[#8A8577]">{order.user.email}</p>
                        )}
                      </div>

                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[12px] text-[#5C5847]">
                        {formatOrderCode(order.id)}
                      </span>

                      <span className="text-[12px] text-[#8A8577]">
                        {formatDate(order.created_at)}
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="ml-1.5 text-[11px] text-[#B4AF9F]">
                          {formatTime(order.created_at)}
                        </span>
                      </span>

                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-right text-[13px] tabular-nums text-[#1C2A24]">
                        {formatAmount(order.total_amount)}
                      </span>

                      <span className="flex justify-end">
                        <StatusTag status={order.status} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-[#F0EDE4] md:hidden">
                {recentOrders.map((order, idx) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="flex w-full items-start justify-between px-6 py-4 text-left transition-colors hover:bg-[#FAF8F3]"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[11px] text-[#B4AF9F]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[11px] text-[#5C5847]">
                          {formatOrderCode(order.id)}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] font-medium text-[#1C2A24]">
                        {getCustomerName(order)}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-[#8A8577]">
                        <span>{formatDate(order.created_at)}</span>
                        <span>·</span>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{formatTime(order.created_at)}</span>
                      </div>
                      <div className="mt-2">
                        <StatusTag status={order.status} />
                      </div>
                    </div>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[14px] font-medium tabular-nums text-[#1C2A24]">
                      {formatAmount(order.total_amount)}
                    </p>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#E4DFD3] pt-6 sm:flex-row">
          <p className="text-[11px] text-[#B4AF9F]">
            © {now.getFullYear()} Estele — Order Operations Console
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[11px] text-[#B4AF9F]">
            Synced {formatTime(now)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
