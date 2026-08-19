import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const inputRefs = useRef([]);

  // If user directly opens /verify-otp without coming from signin
  useEffect(() => {
    if (!email) {
      navigate("/signin", { replace: true });
    }
  }, [email, navigate]);

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);
    setError("");

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move backwards on backspace
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otpValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid or expired OTP."
        );
      }

      // Save authentication token
      localStorage.setItem("token", data.token);

      // Save user if returned by backend
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Redirect to homepage
      navigate("/", { replace: true });
    } catch (error) {
      console.error("OTP verification error:", error);

      setError(
        error.message ||
          "Unable to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;

    setResending(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/request-otp",
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
        throw new Error(
          data.message || "Failed to resend OTP."
        );
      }

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      setCountdown(30);
    } catch (error) {
      console.error("Resend OTP error:", error);

      setError(
        error.message || "Unable to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

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
      marginBottom: "8px",
      letterSpacing: "-0.3px",
    },

    subtitle: {
      fontSize: "15px",
      color: "#6e6e73",
      marginBottom: "8px",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    email: {
      fontSize: "15px",
      color: "#1d1d1f",
      fontWeight: 600,
      marginBottom: "28px",
      wordBreak: "break-word",
    },

    otpContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      marginBottom: "20px",
    },

    otpInput: {
      width: "52px",
      height: "58px",
      border: "1px solid #d2d2d7",
      borderRadius: "12px",
      background: "#ffffff",
      textAlign: "center",
      fontSize: "22px",
      fontWeight: 600,
      color: "#1d1d1f",
      outline: "none",
    },

    error: {
      color: "#d93025",
      fontSize: "13px",
      marginBottom: "18px",
      lineHeight: 1.4,
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
      marginBottom: "20px",
    },

    resendContainer: {
      textAlign: "center",
      fontSize: "14px",
      color: "#6e6e73",
    },

    resendButton: {
      border: "none",
      background: "transparent",
      padding: 0,
      marginLeft: "5px",
      color: countdown > 0 ? "#8e8e93" : "#0071e3",
      fontSize: "14px",
      fontWeight: 500,
      cursor:
        countdown > 0 || resending
          ? "not-allowed"
          : "pointer",
    },

    changeEmail: {
      display: "block",
      margin: "20px auto 0",
      border: "none",
      background: "transparent",
      color: "#0071e3",
      fontSize: "14px",
      cursor: "pointer",
    },
  };

  if (!email) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.brand}>Estele</div>

      <div style={styles.card}>
        <h1 style={styles.title}>
          Verify your email
        </h1>

        <p style={styles.subtitle}>
          We sent a 6-digit verification code to
        </p>

        <p style={styles.email}>{email}</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                style={styles.otpInput}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e) =>
                  handleKeyDown(index, e)
                }
                onPaste={handlePaste}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <p style={styles.error}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.continueButton}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div style={styles.resendContainer}>
          Didn't receive the code?

          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || resending}
            style={styles.resendButton}
          >
            {resending
              ? "Sending..."
              : countdown > 0
              ? `Resend in ${countdown}s`
              : "Resend OTP"}
          </button>
        </div>

        <button
          type="button"
          style={styles.changeEmail}
          onClick={() => navigate("/signin")}
        >
          Change email
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
