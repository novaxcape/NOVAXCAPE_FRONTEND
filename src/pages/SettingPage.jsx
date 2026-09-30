import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TopNavbar2 from "../components/TopNavbar2";
import Swal from "sweetalert2";
import { FaEyeSlash, FaSave, FaEye } from "react-icons/fa";
import "../Styles/Setting.css";

const SettingsPage = () => {
  const { openMobileMenu = () => {} } = useOutletContext() || {};
  // UI-only build: static sample profile (no API calls)
  const [businessData, setBusinessData] = useState({
    businessName: "Lekki Conservation Centre",
    address: "Lekki-Epe Expressway, Lagos",
    phoneNumber: "08012345678",
    email: "vendor@example.com"
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });


  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Business information saved.',
      timer: 3000,
      showConfirmButton: false
    });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Validate passwords
    if (!passwordData.currentPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Password',
        text: 'Please enter your current password',
        confirmButtonColor: '#ff6b35'
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'New password must be at least 6 characters long',
        confirmButtonColor: '#ff6b35'
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New password and confirmation do not match',
        confirmButtonColor: '#ff6b35'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Password Updated',
      text: 'Your password has been changed.',
      timer: 3000,
      showConfirmButton: false
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  const handleSaveAllChanges = () => {
    Swal.fire({
      icon: 'success',
      title: 'All Changes Saved!',
      text: 'Your settings have been updated successfully.',
      confirmButtonColor: '#ff6b35'
    });
  };
  return (
    <>
    <div className="sticky-wrapper">
        <TopNavbar2 onMenuOpen={openMobileMenu} />
      </div>
    <div className="settings-page">
      {/* Business Information */}
      <form className="settings-card" onSubmit={handleBusinessSubmit}>
        <h2>Business Information</h2>
        <p className="sub-text">
          Update your business details and contact information
        </p>

        <div className="form-group">
          <label>Business Name</label>
          <input
            type="text"
            name="businessName"
            value={businessData.businessName}
            onChange={handleBusinessChange}
            placeholder="Lekki Conservation Centre"
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={businessData.address}
            onChange={handleBusinessChange}
            placeholder="Lekki Peninsula, Lagos Nigeria"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={businessData.phoneNumber}
            onChange={handleBusinessChange}
            placeholder="+234 706 394 1359"
            required
          />
        </div>

        {/* <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={businessData.email}
            onChange={handleBusinessChange}
            placeholder="lekkiconservationcenter688@gmail.com"
            required
          />
        </div> */}

        <button type="submit" className="orange-btn">
          Update Business Info
        </button>
      </form>

      {/* Password */}
      <form className="settings-card password-card" onSubmit={handlePasswordSubmit}>
        <h2>Change Password</h2>

        <div className="form-group">
          <label>Current Password</label>
          <div className="password-field">
            <input 
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Input current password"
              required
            />
            <button 
              type="button"
              className="toggle-password-btn"
              onClick={() => togglePasswordVisibility('current')}
            >
              {showPasswords.current ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>New Password</label>
          <div className="password-field">
            <input 
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Input new password"
              required
            />
            <button 
              type="button"
              className="toggle-password-btn"
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPasswords.new ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <small className="password-hint">Password must be at least 6 characters</small>
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <div className="password-field">
            <input 
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              required
            />
            <button 
              type="button"
              className="toggle-password-btn"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPasswords.confirm ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button type="submit" className="orange-btn">
          Change Password
        </button>
      </form>

      
    </div>
    </>

  );
};

export default SettingsPage;