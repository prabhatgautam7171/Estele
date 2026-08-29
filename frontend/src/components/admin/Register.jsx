import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminRegister } from "../../api/adminAuth";

const AdminRegister = () => {
const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirmation, setPasswordConfirmation] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setError("");
  setSuccess("");

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (password !== passwordConfirmation) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const data = await adminRegister(
      name.trim(),
      email.trim(),
      password,
      passwordConfirmation
    );

    // If backend automatically logs admin in
    if (data.token) {
      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      navigate("/admin/login", { replace: true });
      return;
    }

    // Registration successful, but login required
    setSuccess(
      data.message || "Admin account created successfully."
    );

    setTimeout(() => {
      navigate("/admin/login", { replace: true });
    }, 1000);
  } catch (error) {
    console.error("Admin registration error:", error);

    const responseErrors = error.response?.data?.errors;

    if (responseErrors) {
      const firstError = Object.values(responseErrors)
        .flat()
        .find(Boolean);

      setError(
        firstError || "Unable to create admin account."
      );
    } else {
      setError(
        error.response?.data?.message ||
          "Unable to create admin account."
      );
    }
  } finally {
    setLoading(false);
  }
};

const styles = {
page: {
minHeight: "100vh",
display: "flex",
alignItems: "center",
justifyContent: "center",

padding: "24px",
fontFamily:
'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
},


container: {
  width: "100%",
  maxWidth: "420px",
},

brand: {
  textAlign: "center",
  fontSize: "28px",
  fontWeight: 600,
  letterSpacing: "-0.6px",
  color: "#1d1d1f",
  marginBottom: "6px",
},

portal: {
  textAlign: "center",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#86868b",
  marginBottom: "28px",
},

card: {

  padding: "36px 32px 32px",

},

title: {
  fontSize: "26px",
  fontWeight: 700,
  color: "#1d1d1f",
  letterSpacing: "-0.4px",
  margin: "0 0 8px",
},

subtitle: {
  fontSize: "14px",
  color: "#6e6e73",
  lineHeight: 1.5,
  margin: "0 0 28px",
},

formGroup: {
  marginBottom: "16px",
},

label: {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: "#1d1d1f",
  marginBottom: "7px",
},

input: {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 4px",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #d2d2d7",
  borderRadius: "0",
  fontSize: "15px",
  color: "#1d1d1f",
  outline: "none",
},

error: {
  background: "#fff2f2",
  border: "1px solid #ffd6d6",
  borderRadius: "9px",
  padding: "10px 12px",
  color: "#c62828",
  fontSize: "13px",
  lineHeight: 1.4,
  marginBottom: "16px",
},

success: {
  background: "#f0faf3",
  border: "1px solid #c9ecd3",
  borderRadius: "9px",
  padding: "10px 12px",
  color: "#188038",
  fontSize: "13px",
  lineHeight: 1.4,
  marginBottom: "16px",
},

button: {
  width: "100%",
  padding: "13px 0",
  background: loading ? "#8bb9e8" : "#0071e3",
  border: "none",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: 600,
  color: "#ffffff",
  cursor: loading ? "not-allowed" : "pointer",
  transition: "background 0.2s ease",
},

loginText: {
  textAlign: "center",
  marginTop: "22px",
  fontSize: "13px",
  color: "#6e6e73",
},

loginLink: {
  color: "#0071e3",
  fontWeight: 500,
  cursor: "pointer",
  marginLeft: "4px",
},

footer: {
  textAlign: "center",
  marginTop: "20px",
  fontSize: "11px",
  color: "#8e8e93",
},

};

return ( <div style={styles.page}> <div style={styles.container}> <div style={styles.brand}>Estele</div>


    <div style={styles.portal}>Admin Portal</div>

    <div style={styles.card}>
      <h1 style={styles.title}>Create admin account</h1>

      <p style={styles.subtitle}>
        Create an administrator account to manage your Estele store.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            autoComplete="email"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm password</label>

          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) =>
              setPasswordConfirmation(e.target.value)
            }
            placeholder="Re-enter your password"
            autoComplete="new-password"
            style={styles.input}
            required
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {success && (
          <div style={styles.success}>{success}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "#005bbf";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "#0071e3";
            }
          }}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div style={styles.loginText}>
        Already have an admin account?
        <span
          style={styles.loginLink}
          onClick={() => navigate("/admin/login")}
        >
          Sign in
        </span>
      </div>
    </div>

    <div style={styles.footer}>
      Authorized Estele administrators only
    </div>
  </div>
</div>


);
};

export default AdminRegister;

