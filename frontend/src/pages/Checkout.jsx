
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCart } from "../api/cart";
import { placeOrder } from "../api/orders";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartError, setCartError] = useState("");

  const [processing, setProcessing] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  // -----------------------------
  // Fetch cart
  // -----------------------------
  useEffect(() => {
    const fetchCart = async () => {
      // const token = localStorage.getItem("esteletoken");

      // if (!token) {
      //   setCart(null);
      //   setLoading(false);
      //   return;
      // }

      try {
        setLoading(true);
        setCartError("");

        const data = await getCart();

        setCart(data.cart);
      } catch (err) {
        console.error("CART ERROR:", err);

        setCartError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load cart."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // -----------------------------
  // Cart calculations
  // -----------------------------
  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal > 5000 ? 0 : 99;

  const total = subtotal + shipping;

  // -----------------------------
  // Place order
  // -----------------------------
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (processing) return;

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const data = await placeOrder();

      console.log("ORDER PLACED:", data);

      setOrder(data.order || null);

      setPopupVisible(true);

      // Redirect after success
      setTimeout(() => {
        navigate("/orders", { replace: true });
      }, 2500);
    } catch (err) {
      console.error("ORDER ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to place your order. Please try again."
      );

      setProcessing(false);
    }
  };

  // -----------------------------
  // Styles
  // -----------------------------
  const styles = {
    container: {
      width: "100%",
      maxWidth: "480px",
      padding: "20px",
      margin: "0 auto",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },

    brand: {
      fontSize: "28px",
      fontWeight: 600,
      letterSpacing: "-0.5px",
      color: "#1d1d1f",
      textAlign: "center",
      marginBottom: "24px",
    },

    card: {
      background: "#ffffff",
      padding: "32px 24px",
    },

    title: {
      fontSize: "24px",
      fontWeight: 700,
      color: "#1d1d1f",
      marginBottom: "4px",
      letterSpacing: "-0.3px",
    },

    subtitle: {
      fontSize: "15px",
      color: "#6e6e73",
      marginBottom: "24px",
    },

    sectionTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#1d1d1f",
      marginBottom: "12px",
      borderBottom: "1px solid #e8e8ed",
      paddingBottom: "8px",
    },

    summary: {
      marginBottom: "24px",
    },

    itemRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "6px 0",
      fontSize: "14px",
      color: "#1d1d1f",
    },

    itemImage: {
      width: "48px",
      height: "48px",
      borderRadius: "8px",
      objectFit: "cover",
      background: "#f0f0f0",
      flexShrink: 0,
    },

    itemDetails: {
      flex: 1,
    },

    itemName: {
      fontSize: "14px",
      fontWeight: 500,
    },

    itemMeta: {
      fontSize: "13px",
      color: "#6e6e73",
    },

    itemPrice: {
      fontWeight: 500,
      whiteSpace: "nowrap",
    },

    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#1d1d1f",
      padding: "4px 0",
    },

    summaryTotal: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "18px",
      fontWeight: 700,
      color: "#1d1d1f",
      paddingTop: "8px",
      borderTop: "1px solid #e8e8ed",
      marginTop: "6px",
    },

    error: {
      color: "#d93025",
      fontSize: "13px",
      marginBottom: "12px",
      lineHeight: 1.4,
    },

    payButton: {
      width: "100%",
      height: "50px",
      padding: "0 20px",
      background: processing ? "#005bbf" : "#0071e3",
      border: "none",
      borderRadius: "12px",
      fontSize: "17px",
      fontWeight: 600,
      color: "#ffffff",
      cursor: processing ? "not-allowed" : "pointer",
      transition: "background 0.2s ease",
      marginTop: "8px",
      position: "relative",
      overflow: "hidden",
    },

    buttonContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },

    spinner: {
      width: "18px",
      height: "18px",
      border: "2px solid rgba(255,255,255,0.35)",
      borderTop: "2px solid #ffffff",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    },

    emptyState: {
      textAlign: "center",
      padding: "40px 0",
      color: "#6e6e73",
      fontSize: "15px",
      lineHeight: 1.6,
    },

    backLink: {
      display: "block",
      marginTop: "16px",
      textAlign: "center",
      color: "#0071e3",
      textDecoration: "none",
      fontSize: "14px",
      cursor: "pointer",
    },
  };

  // -----------------------------
  // Loading cart
  // -----------------------------
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>

        <div style={styles.card}>
          <div style={styles.emptyState}>
            Loading your cart…
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Cart error
  // -----------------------------
  if (cartError) {
    return (
      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>

        <div style={styles.card}>
          <div
            style={{
              ...styles.emptyState,
              color: "#d93025",
            }}
          >
            {cartError}
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Empty cart
  // -----------------------------
  if (!cart || cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>

        <div style={styles.card}>
          <div style={styles.emptyState}>
            Your cart is empty.
            <br />

            <span
              style={{
                color: "#0071e3",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Continue shopping
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes popupFadeIn {
            0% {
              opacity: 0;
              transform: scale(0.8) translateY(20px);
            }

            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes checkScale {
            0% {
              transform: scale(0);
            }

            70% {
              transform: scale(1.15);
            }

            100% {
              transform: scale(1);
            }
          }

          .popup-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(6px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }

          .popup-box {
            background: white;
            border-radius: 28px;
            padding: 48px 40px 40px;
            max-width: 360px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            animation:
              popupFadeIn
              0.5s
              cubic-bezier(0.34, 1.56, 0.64, 1)
              forwards;
          }

          .popup-check {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: #34c759;
            margin-bottom: 20px;
            font-size: 40px;
            color: white;
            animation:
              checkScale
              0.5s
              cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .popup-title {
            font-size: 22px;
            font-weight: 700;
            color: #1d1d1f;
            margin-bottom: 6px;
          }

          .popup-message {
            font-size: 15px;
            color: #6e6e73;
            margin-bottom: 0;
            line-height: 1.5;
          }

          .popup-amount {
            font-size: 20px;
            font-weight: 600;
            color: #1d1d1f;
            margin: 8px 0 0;
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>

        <div style={styles.card}>
          <h1 style={styles.title}>
            Checkout
          </h1>

          <p style={styles.subtitle}>
            Review your order before placing it.
          </p>

          {/* Order Summary */}
          <div style={styles.summary}>
            <div style={styles.sectionTitle}>
              Order Summary
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                style={styles.itemRow}
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  style={styles.itemImage}
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.png";
                  }}
                />

                <div style={styles.itemDetails}>
                  <div style={styles.itemName}>
                    {item.name}
                  </div>

                  <div style={styles.itemMeta}>
                    Qty: {item.quantity} × ₹
                    {item.price}
                  </div>
                </div>

                <div style={styles.itemPrice}>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </div>
              </div>
            ))}

            <div style={styles.summaryRow}>
              <span>Subtotal</span>

              <span>
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div style={styles.summaryRow}>
              <span>Shipping</span>

              <span
                style={{
                  color: "#188038",
                  fontWeight: 600,
                }}
              >
                {shipping === 0
                  ? "Free"
                  : `₹${shipping}`}
              </span>
            </div>

            <div style={styles.summaryTotal}>
              <span>Total</span>

              <span>
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {/* Place Order */}
          <form onSubmit={handlePlaceOrder}>
            <button
              type="submit"
              disabled={processing}
              style={styles.payButton}
            >
              {processing ? (
                <span style={styles.buttonContent}>
                  <span style={styles.spinner} />
                  Placing your order…
                </span>
              ) : (
                `Pay ₹${total.toFixed(2)}`
              )}
            </button>
          </form>

          <span
            style={styles.backLink}
            onClick={() => navigate("/")}
          >
            ← Back to Cart
          </span>
        </div>
      </div>

      {/* Success Popup */}
      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-check">
              ✓
            </div>

            <div className="popup-title">
              Order Placed!
            </div>

            <div className="popup-message">
              Your order has been placed
              successfully.
              <br />
              Thank you for shopping with us.
            </div>

            <div className="popup-amount">
              ₹
              {Number(
                order?.total_amount ?? total
              ).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;

