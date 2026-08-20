import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [receiveOffers, setReceiveOffers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP.");
      }

      console.log("OTP requested:", data);

      // Move to OTP screen
      navigate("/verify-otp", {
        state: {
          email,
        },
      });
    } catch (error) {
      console.error("OTP request error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Inline style objects
  const styles = {
    container: {
      width: "100%",
      maxWidth: "420px",
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
      marginBottom: "32px",
    },

    card: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "60px 5px 5px",
    },

    title: {
      fontSize: "28px",
      fontWeight: 700,
      color: "#1d1d1f",
      marginBottom: "6px",
      letterSpacing: "-0.3px",
    },

    subtitle: {
      fontSize: "15px",
      color: "#6e6e73",
      marginBottom: "28px",
      fontWeight: 400,
    },

    shopButton: {
      width: "100%",
      padding: "14px 0",
      background: "#5533EB",
      border: "1px solid #d2d2d7",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: 500,
      color: "#ffffff",
      cursor: "none",
      transition: "background 0.2s ease",
      marginBottom: "20px",
    },

    divider: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginBottom: "24px",
    },

    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#d2d2d7",
    },

    dividerText: {
      fontSize: "13px",
      color: "#8e8e93",
      fontWeight: 400,
      textTransform: "lowercase",
    },

    formGroup: {
      position: "relative",
      marginBottom: "18px",
    },

    label: {
      display: "none",
      fontSize: "14px",
      fontWeight: 500,
      color: "#1d1d1f",
      marginBottom: "6px",
    },

    input: {
      width: "100%",
      padding: "14px 16px",
      background: "#ffffff",
      border: "1px solid #d2d2d7",
      borderRadius: "12px",
      fontSize: "15px",
      color: "#1d1d1f",
      outline: "none",
    },

    lastUsed: {
      position: "absolute",
      right: "150px",
      top: "42px",
      fontSize: "12px",
      color: "#ffffff",
      background: "#005BD1",
      padding: "0 6px",
      borderRadius: "10px",
      pointerEvents: "none",
    },

    checkboxGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "22px",
    },

    checkbox: {
      width: "18px",
      height: "18px",
      accentColor: "#0071e3",
      cursor: "pointer",
      flexShrink: 0,
    },

    checkboxLabel: {
      fontSize: "14px",
      color: "#1d1d1f",
      cursor: "pointer",
    },

    legal: {
      fontSize: "13px",
      color: "#6e6e73",
      lineHeight: 1.6,
      marginBottom: "26px",
    },

    link: {
      color: "#0071e3",
      textDecoration: "none",
    },

    continueButton: {
      width: "100%",
      padding: "14px 0",
      background: loading ? "#8bb9e8" : "#0071e3",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: 600,
      color: "#ffffff",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div  style={styles.brand}>Estele</div>

      <div style={styles.card}>
        <h1 style={styles.title}>Sign in</h1>

        <p style={styles.subtitle}>
          Sign in or create an account
        </p>

        <button type="button" style={styles.shopButton}>
          Continue with shop
        </button>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine}></span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>

            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <span style={styles.lastUsed}>
              Last used
            </span>
          </div>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="offers"
              style={styles.checkbox}
              checked={receiveOffers}
              onChange={(e) =>
                setReceiveOffers(e.target.checked)
              }
            />

            <label
              htmlFor="offers"
              style={styles.checkboxLabel}
            >
              Email me with news and offers
            </label>
          </div>

          <p style={styles.legal}>
            By continuing, you agree to our{" "}
            <a href="#" style={styles.link}>
              Terms of service
            </a>
            <br />
            <a href="#" style={styles.link}>
              Privacy policy
            </a>
          </p>

          {error && (
            <p
              style={{
                color: "#d93025",
                fontSize: "13px",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={styles.continueButton}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = "#005bbf";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = "#0071e3";
              }
            }}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
