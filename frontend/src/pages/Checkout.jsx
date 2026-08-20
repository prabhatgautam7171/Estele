import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Assuming you have a getCart function in your API module
import { getCart } from "../api/cart"; // adjust the path as needed

const Checkout = () => {
  const navigate = useNavigate();

  // ---- Cart state (fetched from API) ----
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartError, setCartError] = useState("");

  // ---- Payment form state ----
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [processing, setProcessing] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [error, setError] = useState("");

  // ---- Fetch cart on mount ----
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCart(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setCartError("");
        const data = await getCart(); // your existing getCart function
        setCart(data.cart);
      } catch (err) {
        console.error("CART ERROR:", err);
        setCartError(err.message || "Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ---- Calculate totals (only if cart exists) ----
  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 99;
  const total = subtotal + shipping;

  // ---- Input formatting ----
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(" ").slice(0, 19);
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
    setError("");
  };

  const handleExpiryChange = (e) => {
    setExpiry(formatExpiry(e.target.value));
    setError("");
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 3));
    setError("");
  };

  // ---- Payment submission ----
  const handlePay = (e) => {
    e.preventDefault();

    // Basic validation
    if (cardNumber.replace(/\s/g, "").length < 16) {
      setError("Please enter a valid 16-digit card number.");
      return;
    }
    if (expiry.replace("/", "").length < 4) {
      setError("Please enter a valid expiry date (MM/YY).");
      return;
    }
    if (cvv.length < 3) {
      setError("Please enter a valid 3-digit CVV.");
      return;
    }
    if (!cardholder.trim()) {
      setError("Please enter the cardholder name.");
      return;
    }

    setProcessing(true);
    setError("");

    // Simulate payment processing (1.5s)
    setTimeout(() => {
      setProcessing(false);
      setPopupVisible(true);

      // Redirect after popup animation (2.5s)
      setTimeout(() => {
        // Optionally clear cart or navigate to orders
        navigate("/", { replace: true });
      }, 2500);
    }, 1500);
  };

  // ---- Styles (same as before) ----
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
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: 500,
      color: "#1d1d1f",
      marginBottom: "4px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      background: "#ffffff",
      border: "1px solid #d2d2d7",
      borderRadius: "10px",
      fontSize: "15px",
      color: "#1d1d1f",
      outline: "none",
      transition: "border-color 0.2s ease, background 0.2s ease",
      boxSizing: "border-box",
    },
    row: {
      display: "flex",
      gap: "12px",
    },
    rowItem: {
      flex: 1,
    },
    error: {
      color: "#d93025",
      fontSize: "13px",
      marginBottom: "12px",
    },
    payButton: {
      width: "100%",
      padding: "14px 0",
      background: processing ? "#8bb9e8" : "#0071e3",
      border: "none",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: 600,
      color: "#ffffff",
      cursor: processing ? "not-allowed" : "pointer",
      transition: "background 0.2s",
      marginTop: "8px",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 0",
      color: "#6e6e73",
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

  // ---- Render loading / empty states ----
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>
        <div style={styles.card}>
          <div style={styles.emptyState}>Loading your cart…</div>
        </div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>
        <div style={styles.card}>
          <div style={styles.emptyState} style={{ color: "#d93025" }}>
            {cartError}
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>
        <div style={styles.card}>
          <div style={styles.emptyState}>
            Your cart is empty.
            <br />
            <span
              style={{ color: "#0071e3", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Continue shopping
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ---- Main checkout render ----
  return (
    <>
      {/* ---- Popup CSS ---- */}
      <style>{`
        @keyframes popupFadeIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupFadeOut {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.8) translateY(20px); }
        }
        @keyframes backdropFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: backdropFadeIn 0.3s ease forwards;
        }
        .popup-box {
          background: white;
          border-radius: 28px;
          padding: 48px 40px 40px;
          max-width: 360px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          animation: popupFadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .popup-box.closing {
          animation: popupFadeOut 0.35s ease forwards;
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
        }
        .popup-amount {
          font-size: 20px;
          font-weight: 600;
          color: #1d1d1f;
          margin: 8px 0 0;
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.brand}>Estele</div>

        <div style={styles.card}>
          <h1 style={styles.title}>Checkout</h1>
          <p style={styles.subtitle}>Complete your payment securely</p>

          {/* ---- Order Summary ---- */}
          <div style={styles.summary}>
            <div style={styles.sectionTitle}>Order Summary</div>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.itemRow}>
                <img
                  src={item.image || "/placeholder.png"} // fallback if image missing
                  alt={item.name}
                  style={styles.itemImage}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
                <div style={styles.itemDetails}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemMeta}>
                    Qty: {item.quantity} × ₹{item.price}
                  </div>
                </div>
                <div style={styles.itemPrice}>₹{item.price * item.quantity}</div>
              </div>
            ))}
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span className="text-green-600  font-bold">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* ---- Payment Form ---- */}
          <form onSubmit={handlePay}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
                style={styles.input}
                onFocus={(e) =>
                  ((e.target.style.borderColor = "#0071e3"),
                  (e.target.style.background = "#ffffff"))
                }
                onBlur={(e) =>
                  ((e.target.style.borderColor = "#d2d2d7"),
                  (e.target.style.background = "#f5f5f7"))
                }
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                style={styles.input}
                onFocus={(e) =>
                  ((e.target.style.borderColor = "#0071e3"),
                  (e.target.style.background = "#ffffff"))
                }
                onBlur={(e) =>
                  ((e.target.style.borderColor = "#d2d2d7"),
                  (e.target.style.background = "#f5f5f7"))
                }
                required
              />
            </div>

            <div style={styles.row}>
              <div style={styles.rowItem}>
                <label style={styles.label}>Expiry (MM/YY)</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  style={styles.input}
                  onFocus={(e) =>
                    ((e.target.style.borderColor = "#0071e3"),
                    (e.target.style.background = "#ffffff"))
                  }
                  onBlur={(e) =>
                    ((e.target.style.borderColor = "#d2d2d7"),
                    (e.target.style.background = "#f5f5f7"))
                  }
                  required
                />
              </div>
              <div style={styles.rowItem}>
                <label style={styles.label}>CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={handleCvvChange}
                  style={styles.input}
                  onFocus={(e) =>
                    ((e.target.style.borderColor = "#0071e3"),
                    (e.target.style.background = "#ffffff"))
                  }
                  onBlur={(e) =>
                    ((e.target.style.borderColor = "#d2d2d7"),
                    (e.target.style.background = "#f5f5f7"))
                  }
                  required
                />
              </div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              type="submit"
              disabled={processing}
              style={styles.payButton}
            >
              {processing ? "Processing…" : `Pay ₹${total}`}
            </button>
          </form>

          <span style={styles.backLink} onClick={() => navigate("/")}>
            ← Back to Cart
          </span>
        </div>
      </div>

      {/* ---- Success Popup ---- */}
      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-check">✓</div>
            <div className="popup-title">Payment Successful!</div>
            <div className="popup-message">
              Your order has been placed.
              <br />
              Thank you for shopping with us.
            </div>
            <div className="popup-amount">₹{total}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
