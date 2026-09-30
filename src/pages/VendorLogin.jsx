// Pages/Vendor/VendorLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

import "../Styles/VendorLogin.css";


const VendorLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrorState] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setErrorState("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorState("Please fill in all fields");
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    setErrorState("");

    // UI-only: no request is made.
    await Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back!",
      confirmButtonColor: "#ff6b35",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/vendor/dashboard", { replace: true });
  };
  return (
    <div className="vendor-login-wrapper">
      <div className="login-container">
        <div className="login-panel">
          <img src="/novaxcape/img.png" alt="Vendor Login" />
        </div>
        <div className="rightLogin-panel">
          <h2>Vendor Login</h2>

          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#fee2e2",
                borderRadius: "8px",
              }}
            >
              {error}
            </div>
          )}

          <form className="vendor-login-form" onSubmit={handleSubmit}>
            <div className="vendor-login-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                                required
              />
            </div>

            <div className="vendor-login-field">
              <label>Password</label>
              <div className="vendor-login-password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                                    required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="vendor-login-eye"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="forgot-password-row">
              <Link to="/vendor/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="signup-btn"
            >
              Login
            </button>
          </form>

          <p className="signin-text">
            Don't have a vendor account? <Link to="/signupvendor">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;