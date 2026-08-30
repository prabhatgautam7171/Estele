import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, ChevronRight, ShoppingBag } from "lucide-react";
import { getAdminOrders } from "../../api/adminOrders";

/**
 * Fonts: Fraunces (display), IBM Plex Sans (UI text), IBM Plex Mono (codes,
 * amounts, dates). Matches the rest of the Order Operations console. If
 * fonts are already loaded globally, move this @import to your base CSS
 * and drop the <style> tag below.
 */
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const INK = "#1C2A24";
const PAPER = "#F7F5EF";
const BRASS = "#A9822F";

const STATUS_META = {
  pending: { label: "Pending", color: "#B8863B" },
  confirmed: { label: "Confirmed", color: "#3F5670" },
  processing: { label: "Processing", color: "#3F5670" },
  shipped: { label: "Shipped", color: "#4B7A63" },
  delivered: { label: "Delivered", color: "#2E5943" },
  cancelled: { label: "Cancelled", color: "#A84438" },
};

const FILTERS = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

const StatusTag = ({ status }) => {
  const meta = STATUS_META[status?.toLowerCase()] || { label: status || "Unknown", color: "#6B7280" };
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium capitalize" style={{ color: meta.color }}>
      <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
};

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setRefreshing(true);
      setError("");

      const data = await getAdminOrders();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to load admin orders:", err);
      setError(err.response?.data?.message || "Unable to load orders.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatOrderCode = (id) => `No. ${String(id ?? 0).padStart(6, "0")}`;

  const filterCounts = useMemo(() => {
    const counts = { all: orders.length };
    FILTERS.slice(1).forEach((key) => {
      counts[key] = orders.filter((o) => o.status?.toLowerCase() === key).length;
    });
    return counts;
  }, [orders]);

  const visibleOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status?.toLowerCase() === filter);
  }, [orders, filter]);

  if (loading) {
    return (
      <div style={{ backgroundColor: PAPER, fontFamily: "'IBM Plex Sans', sans-serif" }} className="flex min-h-[420px] flex-col items-center justify-center gap-3">
        <style>{FONT_IMPORT}</style>
        <div className="h-5 w-5 animate-spin rounded-full border-2" style={{ borderColor: "#E4DFD3", borderTopColor: BRASS }} />
        <p className="text-[13px] text-[#8A8577]">Retrieving orders…</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: PAPER, fontFamily: "'IBM Plex Sans', sans-serif", color: INK }} className="min-h-screen">
      <style>{FONT_IMPORT}</style>

      <div className="mx-auto max-w-[1200px] px-6 py-8 md:px-10 md:py-10">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[11px] uppercase tracking-[1.6px] text-[#8A8577]">
              Order Operations
            </p>
            <h1 style={{ fontFamily: "'Fraunces', serif" }} className="mt-1 text-[30px] leading-none tracking-[-0.4px] text-[#1C2A24] md:text-[34px]">
              Order Manifest
            </h1>
            <p className="mt-2 text-[13px] text-[#8A8577]">
              {orders.length} order{orders.length === 1 ? "" : "s"} on record
            </p>
          </div>

          <button
            onClick={loadOrders}
            disabled={refreshing}
            className="flex items-center gap-2 self-start rounded-full border px-4 py-2.5 text-[12px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "#D8D2C2", color: INK }}
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} style={{ color: BRASS }} />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 border-l-2 px-5 py-3.5" style={{ borderColor: "#A84438", backgroundColor: "#FBF1EE" }}>
            <p className="text-[13px] text-[#7A2E20]">{error}</p>
          </div>
        )}

        {/* Filter tabs */}
        <div className="mb-5 flex flex-wrap items-center gap-1 border-b border-[#E4DFD3]">
          {FILTERS.map((key) => {
            const isActive = filter === key;
            const label = key === "all" ? "All" : STATUS_META[key]?.label || key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="relative px-3.5 py-2.5 text-[13px] font-medium capitalize transition-colors"
                style={{ color: isActive ? INK : "#8A8577" }}
              >
                {label}
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="ml-1.5 text-[11px] text-[#B4AF9F]">
                  {filterCounts[key] ?? 0}
                </span>
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-[2px]" style={{ backgroundColor: BRASS }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Empty */}
        {!error && visibleOrders.length === 0 && (
          <div className="border border-[#E4DFD3] bg-white px-5 py-20 text-center">
            <ShoppingBag size={26} strokeWidth={1.3} className="mx-auto" style={{ color: "#C9C3B3" }} />
            <p style={{ fontFamily: "'Fraunces', serif" }} className="mt-4 text-[17px] text-[#1C2A24]">
              {orders.length === 0 ? "The manifest is empty" : "No orders match this filter"}
            </p>
            <p className="mt-1 text-[13px] text-[#8A8577]">
              {orders.length === 0
                ? "Orders will be logged here as soon as customers check out."
                : "Try a different status, or clear the filter to see everything."}
            </p>
          </div>
        )}

        {/* Table */}
        {visibleOrders.length > 0 && (
          <div className="overflow-hidden border border-[#E4DFD3] bg-white">
            {/* Desktop header row */}
            <div
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="hidden grid-cols-[90px_1.3fr_1.6fr_1fr_1fr_1fr_28px] items-center border-b border-[#E4DFD3] px-6 py-3 text-[10px] uppercase tracking-[1.2px] text-[#B4AF9F] md:grid"
            >
              <span>Line</span>
              <span>Order</span>
              <span>Customer</span>
              <span>Date</span>
              <span className="text-right">Amount</span>
              <span>Status</span>
              <span />
            </div>

            <div>
              {visibleOrders.map((order, idx) => (
                <div
                  key={order.id}
                  onClick={() => navigate(`/admin/orders/${order.id}`)}
                  className="grid cursor-pointer grid-cols-1 gap-3 border-b border-[#F0EDE4] px-6 py-4 transition-colors last:border-b-0 hover:bg-[#FAF8F3] md:grid-cols-[90px_1.3fr_1.6fr_1fr_1fr_1fr_28px] md:items-center md:gap-0"
                >
                  {/* Line no. — desktop only */}
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="hidden text-[12px] text-[#B4AF9F] md:block">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Order */}
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[13px] text-[#1C2A24]">
                      {formatOrderCode(order.id)}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#8A8577]">
                      {order.items?.length || 0} item{(order.items?.length || 0) === 1 ? "" : "s"}
                    </div>
                  </div>

                  {/* Customer */}
                  <div>
                    <div className="text-[13px] font-medium text-[#1C2A24]">
                      {order.user?.name || "Customer"}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#8A8577]">
                      {order.user?.email || "—"}
                    </div>
                  </div>

                  {/* Date */}
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[12px] text-[#8A8577]">
                    {formatDate(order.created_at)}
                  </div>

                  {/* Amount */}
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[13px] font-medium tabular-nums text-[#1C2A24] md:text-right">
                    {formatAmount(order.total_amount)}
                  </div>

                  {/* Status */}
                  <div>
                    <StatusTag status={order.status || "pending"} />
                  </div>

                  {/* View chevron — desktop only */}
                  <ChevronRight size={16} className="hidden md:block" style={{ color: "#C9C3B3" }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
