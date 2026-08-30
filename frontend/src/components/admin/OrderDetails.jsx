import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAdminOrder,
  updateAdminOrderStatus,
} from "../../api/adminOrders";

/**
 * Fonts: Fraunces (display), IBM Plex Sans (UI text), IBM Plex Mono (codes,
 * amounts, timestamps). Matches the Order Operations dashboard. If fonts are
 * already loaded globally, move this @import to your base CSS and drop the
 * <style> tag below.
 */
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
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

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const StatusTag = ({ status, size = "md" }) => {
  const meta = STATUS_META[status?.toLowerCase()] || { label: status || "Unknown", color: "#6B7280" };
  const dot = size === "lg" ? "h-[7px] w-[7px]" : "h-[6px] w-[6px]";
  const text = size === "lg" ? "text-[13px]" : "text-[12px]";
  return (
    <span className={`inline-flex items-center gap-2 ${text} font-medium capitalize`} style={{ color: meta.color }}>
      <span className={`${dot} rounded-full`} style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminOrder(id);
      const currentOrder = data.order;

      setOrder(currentOrder);
      setStatus(currentOrder.status || "pending");
    } catch (err) {
      console.error("Failed to load order:", err);
      setError(err.response?.data?.message || "Unable to load order.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!order || saving || status === order.status) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const data = await updateAdminOrderStatus(order.id, status);

      setOrder(data.order || { ...order, status });
      setSuccess(data.message || "Order status updated successfully.");

      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      console.error("Failed to update order:", err);
      setError(err.response?.data?.message || "Unable to update order status.");
    } finally {
      setSaving(false);
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

  const formatTime = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatOrderCode = (orderId) => `No. ${String(orderId ?? 0).padStart(6, "0")}`;

  const itemCount = (order?.items || []).reduce((s, item) => s + Number(item.quantity || 0), 0);

  // ---------- loading / hard error states ----------

  if (loading) {
    return (
      <div style={{ backgroundColor: PAPER, fontFamily: "'IBM Plex Sans', sans-serif" }} className="flex min-h-[420px] flex-col items-center justify-center gap-3">
        <style>{FONT_IMPORT}</style>
        <div className="h-5 w-5 animate-spin rounded-full border-2" style={{ borderColor: "#E4DFD3", borderTopColor: BRASS }} />
        <p className="text-[13px] text-[#8A8577]">Retrieving order…</p>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div style={{ backgroundColor: PAPER, fontFamily: "'IBM Plex Sans', sans-serif" }} className="min-h-[420px] px-6 pt-16 md:px-10">
        <style>{FONT_IMPORT}</style>
        <div className="mx-auto max-w-[520px] border-l-2 px-5 py-4" style={{ borderColor: "#A84438", backgroundColor: "#FBF1EE" }}>
          <p className="text-[13px] text-[#7A2E20]">{error}</p>
        </div>
        <div className="mx-auto mt-5 max-w-[520px]">
          <button
            onClick={() => navigate("/admin/orders")}
            className="rounded-full px-5 py-2.5 text-[13px] font-medium text-white transition-colors"
            style={{ backgroundColor: INK }}
          >
            ← Back to manifest
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  // ---------- main render ----------

  return (
    <div style={{ backgroundColor: PAPER, fontFamily: "'IBM Plex Sans', sans-serif", color: INK }} className="min-h-screen">
      <style>{FONT_IMPORT}</style>

      <div className="mx-auto max-w-[1100px] px-6 py-10 md:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button
              onClick={() => navigate("/admin/orders")}
              className="mb-3 border-0 bg-transparent p-0 text-[12px] font-medium uppercase tracking-[1.2px] transition-colors hover:opacity-70"
              style={{ color: BRASS }}
            >
              ← Manifest
            </button>

            <div className="flex items-baseline gap-3">
              <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-[32px] leading-none tracking-[-0.5px] text-[#1C2A24] md:text-[36px]">
                {formatOrderCode(order.id)}
              </h1>
            </div>

            <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-2 text-[12px] text-[#8A8577]">
              Placed {formatDate(order.created_at)} · {formatTime(order.created_at)}
            </p>
          </div>

          <div className="flex items-center gap-2 border border-[#E4DFD3] bg-white px-4 py-2.5">
            <StatusTag status={order.status} size="lg" />
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5 border-l-2 px-5 py-3.5" style={{ borderColor: "#A84438", backgroundColor: "#FBF1EE" }}>
            <p className="text-[13px] text-[#7A2E20]">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-5 border-l-2 px-5 py-3.5" style={{ borderColor: "#4B7A63", backgroundColor: "#F0F5F1" }}>
            <p className="text-[13px] text-[#2E5943]">{success}</p>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 items-start gap-px overflow-hidden border border-[#E4DFD3] bg-[#E4DFD3] lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
          {/* Order items — manifest style */}
          <div className="bg-white p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-[18px] text-[#1C2A24]">
                Items
              </h2>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[11px] uppercase tracking-[1px] text-[#8A8577]">
                {itemCount} unit{itemCount === 1 ? "" : "s"}
              </span>
            </div>

            <div
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="hidden grid-cols-[32px_56px_minmax(0,1fr)_auto_auto] gap-3.5 border-b border-[#EFEBE1] pb-3 text-[10px] uppercase tracking-[1.2px] text-[#B4AF9F] sm:grid"
            >
              <span>#</span>
              <span></span>
              <span>Item</span>
              <span className="text-right">Unit</span>
              <span className="text-right">Total</span>
            </div>

            <div>
              {(order.items || []).map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[32px_56px_minmax(0,1fr)] items-center gap-3.5 border-b border-[#F0EDE4] py-4 last:border-b-0 sm:grid-cols-[32px_56px_minmax(0,1fr)_auto_auto]"
                >
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="hidden text-[12px] text-[#B4AF9F] sm:block">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="h-14 w-14 overflow-hidden bg-[#F3F1EA]">
                    {item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product?.name || "Product"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[11px] text-[#B4AF9F]">
                        —
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-medium text-[#1C2A24]">
                      {item.product?.name || "Product"}
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-1 text-[11px] text-[#8A8577]">
                      Qty {item.quantity}
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-1 text-[12px] text-[#8A8577] sm:hidden">
                      {formatAmount(item.price)} × {item.quantity}
                    </div>
                  </div>

                  <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="hidden text-right text-[13px] tabular-nums text-[#8A8577] sm:block">
                    {formatAmount(item.price)}
                  </div>

                  <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="hidden text-right text-[13px] font-medium tabular-nums text-[#1C2A24] sm:block">
                    {formatAmount(Number(item.price) * Number(item.quantity))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-[#E4DFD3] pt-5">
              <span className="text-[13px] uppercase tracking-[1px] text-[#8A8577]">Total</span>
              <strong style={{ fontFamily: "'Fraunces', serif" }} className="text-[26px] text-[#1C2A24]">
                {formatAmount(order.total_amount)}
              </strong>
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-rows-[auto_auto] divide-y divide-[#E4DFD3] bg-[#E4DFD3]">
            {/* Customer */}
            <div className="bg-white p-6 md:p-8">
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="mb-4 text-[18px] text-[#1C2A24]">
                Customer
              </h2>

              <p className="text-[15px] font-medium text-[#1C2A24]">
                {order.user?.name || "Customer"}
              </p>
              <p className="mt-2 text-[13px] text-[#8A8577]">{order.user?.email || "—"}</p>
              {order.user?.phone && (
                <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="mt-1 text-[13px] text-[#8A8577]">
                  {order.user.phone}
                </p>
              )}
            </div>

            {/* Manage order */}
            <div className="bg-white p-6 md:p-8">
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="mb-4 text-[18px] text-[#1C2A24]">
                Update status
              </h2>

              <label className="mb-2 block text-[11px] font-medium uppercase tracking-[1px] text-[#8A8577]">
                Order status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={saving}
                className="box-border w-full appearance-none border border-[#D8D2C2] bg-white px-3.5 py-3 text-[13px] capitalize text-[#1C2A24] outline-none transition-colors focus:border-[#A9822F] disabled:cursor-not-allowed disabled:bg-[#F3F1EA]"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {STATUS_META[opt]?.label || opt}
                  </option>
                ))}
              </select>

              <button
                onClick={handleStatusUpdate}
                disabled={saving || status === order.status}
                className="mt-3 flex w-full items-center justify-center gap-2 border-0 px-3 py-3 text-[13px] font-semibold uppercase tracking-[0.6px] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: INK }}
              >
                {saving && (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}
                {saving ? "Updating…" : "Update status"}
              </button>

              {status !== order.status && !saving && (
                <p className="mt-3 text-[11px] text-[#8A8577]">
                  Current status is <StatusTag status={order.status} />. Save to apply the change.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
