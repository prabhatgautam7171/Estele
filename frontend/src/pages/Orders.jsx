import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { getMyOrders } from "../api/orders";


const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyOrders();

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          label: "Pending",
          className: "bg-[#fff7e6] text-[#a96800]",
        };

      case "confirmed":
        return {
          label: "Confirmed",
          className: "bg-[#eef4ff] text-[#2563eb]",
        };

      case "processing":
        return {
          label: "Processing",
          className: "bg-[#f3efff] text-[#6d3fd3]",
        };

      case "shipped":
        return {
          label: "Shipped",
          className: "bg-[#edf8f1] text-[#188038]",
        };

      case "delivered":
        return {
          label: "Delivered",
          className: "bg-[#eaf7ee] text-[#137333]",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          className: "bg-[#fff0f0] text-[#d93025]",
        };

      default:
        return {
          label: status || "Pending",
          className: "bg-[#f2f2f2] text-[#555]",
        };
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="min-h-[70vh] bg-white">
        <div className="mx-auto flex min-h-[60vh] max-w-[1100px] items-center justify-center px-5">
          <div className="flex flex-col items-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#e5e5e7] border-t-[#202020]" />

            <p className="mt-4 text-[13px] text-[#8e8e93]">
              Loading your orders...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Main
   */
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">

          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-5 flex items-center gap-1.5 text-[13px] text-[#6e6e73] transition hover:text-[#202020]"
            >
              <ArrowLeft size={15} strokeWidth={1.7} />
              Continue shopping
            </button>

            <h1 className="text-[30px] font-semibold tracking-[-0.8px] text-[#202020] sm:text-[34px]">
              My Orders
            </h1>

            <p className="mt-2 text-[14px] text-[#8e8e93]">
              Track and manage your Estele orders.
            </p>
          </div>

          {/* Refresh */}
          {orders.length > 0 && (
            <button
              type="button"
              onClick={loadOrders}
              className="flex h-9 items-center gap-2 rounded-full border border-[#e1e1e3] bg-white px-3.5 text-[12px] font-medium text-[#555] transition hover:border-[#cfcfd2] hover:bg-[#f7f7f8]"
            >
              <RefreshCw
                size={14}
                strokeWidth={1.7}
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-[12px] border border-[#ffd5d5] bg-[#fff5f5] px-4 py-3">
            <p className="text-[13px] text-[#d93025]">
              {error}
            </p>

            <button
              type="button"
              onClick={loadOrders}
              className="shrink-0 text-[12px] font-medium text-[#d93025] underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!error && orders.length === 0 && (
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[20px] border border-[#e5e5e7] bg-white px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f7]">
              <ShoppingBag
                size={27}
                strokeWidth={1.4}
                className="text-[#8e8e93]"
              />
            </div>

            <h2 className="mt-5 text-[18px] font-semibold tracking-[-0.3px] text-[#202020]">
              No orders yet
            </h2>

            <p className="mt-2 max-w-[330px] text-[13px] leading-5 text-[#8e8e93]">
              Once you place an order, your purchases will
              appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 rounded-full bg-[#202020] px-6 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#333]"
            >
              Start shopping
            </button>
          </div>
        )}

        {/* Orders */}
        {orders.length > 0 && (
          <div className="space-y-4">

            {orders.map((order) => {
              const status = getStatus(order.status);

              const items = order.items || [];

              const firstItem = items[0];

              return (
                <button
                  key={order.id}
                  type="button"
                  onClick={() =>
                    navigate(`/orders/${order.id}`)
                  }
                  className="group w-full rounded-[18px] border border-[#e5e5e7] bg-white p-5 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-[#d8d8da] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-6"
                >

                  {/* Top */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f0f2] pb-4">

                    <div>
                      <p className="text-[14px] font-semibold text-[#202020]">
                        Order #{order.id}
                      </p>

                      <p className="mt-1 text-[12px] text-[#8e8e93]">
                        Placed on {formatDate(order.created_at)}
                      </p>
                    </div>

                    <div
                      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${status.className}`}
                    >
                      {status.label}
                    </div>
                  </div>

                  {/* Product preview */}
                  <div className="flex items-center gap-4 py-5">

                    {/* Image */}
                    <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[12px] bg-[#f5f5f7]">

                      {firstItem?.product?.image ? (
                        <img
                          src={firstItem.product.image}
                          alt={
                            firstItem.product.name ||
                            "Product"
                          }
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package
                            size={23}
                            strokeWidth={1.4}
                            className="text-[#aaa]"
                          />
                        </div>
                      )}

                      {/* More items */}
                      {items.length > 1 && (
                        <div className="absolute bottom-1 right-1 rounded-full bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white">
                          +{items.length - 1}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">

                      <p className="truncate text-[14px] font-medium text-[#202020]">
                        {firstItem?.product?.name ||
                          "Estele Product"}
                      </p>

                      <p className="mt-1 text-[12px] text-[#8e8e93]">
                        {items.length}{" "}
                        {items.length === 1
                          ? "item"
                          : "items"}
                      </p>

                      {firstItem?.quantity && (
                        <p className="mt-1 text-[12px] text-[#8e8e93]">
                          Qty: {firstItem.quantity}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="hidden text-right sm:block">
                      <p className="text-[11px] text-[#8e8e93]">
                        Total
                      </p>

                      <p className="mt-1 text-[15px] font-semibold text-[#202020]">
                        ₹
                        {formatAmount(
                          order.total_amount
                        )}
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      strokeWidth={1.6}
                      className="shrink-0 text-[#b5b5b8] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#202020]"
                    />
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between border-t border-[#f0f0f2] pt-4">

                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#8e8e93]">
                        Order total
                      </span>

                      <span className="text-[13px] font-semibold text-[#202020] sm:hidden">
                        ₹
                        {formatAmount(
                          order.total_amount
                        )}
                      </span>
                    </div>

                    <span className="text-[12px] font-medium text-[#6e6e73] transition group-hover:text-[#202020]">
                      View details
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
