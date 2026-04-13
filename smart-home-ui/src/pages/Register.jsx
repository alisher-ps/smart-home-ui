import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          SMART HOME PANEL
        </p>

        <h1
          style={{
            marginTop: "10px",
            marginBottom: "8px",
            fontSize: "32px",
          }}
        >
          Register
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: "24px",
            color: "#64748b",
          }}
        >
          Create your account to start using the system.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#dc2626",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "none",
              background: "#0f172a",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p
          style={{
            marginTop: "18px",
            marginBottom: 0,
            color: "#475569",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: "700" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;