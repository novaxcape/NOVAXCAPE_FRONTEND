// Pages/Vendor/VendorChangePassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import "../Styles/SignUpVendor.css"


const VendorChangePassword = () => {
  const navigate = useNavigate();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setErrorState] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setErrorState("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setErrorState("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorState("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setErrorState("Password must be at least 6 characters");
      return;
    }

    setErrorState("");

    // UI-only: no request is made.
    Swal.fire({
      icon: "success",
      title: "Password Changed!",
      text: "Please login with your new password.",
      confirmButtonColor: "#ff6b35",
    });

    navigate("/vendor/login");
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-panel">
          <img src="/novaxcape/img.png" alt="Change Password" />
        </div>
        <div className="rightLogin-panel">
          <h2>Change Password</h2>

          {error && (
            <div className="error-message" style={{
              color: "red",
              textAlign: "center",
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#fee2e2",
              borderRadius: "8px"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Current password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", paddingRight: "40px" }}
                />
                <span
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666"
                  }}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", paddingRight: "40px" }}
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666"
                  }}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="signup-btn"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorChangePassword;
