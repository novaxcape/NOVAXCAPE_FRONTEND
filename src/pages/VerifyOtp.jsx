import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../Styles/Login.css";
import Image from "../components/Image";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [canResend, setCanResend] = useState(false);

  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem("Name");
  const from = location.state?.from || "/";
  const bookingData = location.state?.bookingData || null;

  // Store booking data in state for later use
  const [pendingBooking, setPendingBooking] = useState(bookingData);

  // Allow resend after 59 seconds (no visible countdown, just a wait period)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanResend(true);
    }, 59000);
    return () => clearTimeout(timeout);
  }, []);

  // Check localStorage for pending booking if not in state
  useEffect(() => {
    if (!pendingBooking) {
      const stored = localStorage.getItem('pendingBooking');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPendingBooking(parsed);
        } catch (e) {
          console.error('Error parsing pending booking:', e);
        }
      }
    }
  }, [pendingBooking]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Please enter the 6-digit verification code.",
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email not found. Please sign up again.",
        confirmButtonColor: "#ff6b35",
      });
      navigate("/signup");
      return;
    }

    // UI-only: no request is made; any complete code is accepted.
    const booking = pendingBooking || localStorage.getItem("pendingBooking");

    if (booking) {
      let bookingDataObj = booking;
      if (typeof booking === "string") {
        try {
          bookingDataObj = JSON.parse(booking);
        } catch {
          bookingDataObj = {};
        }
      }

      localStorage.removeItem("pendingBooking");
      setPendingBooking(null);

      Swal.fire({
        icon: "success",
        title: "Email Verified! ✅",
        text: "Your email has been verified successfully.",
        confirmButtonColor: "#ff6b35",
        confirmButtonText: "Continue to Booking",
        showCancelButton: true,
        cancelButtonText: "Go to Login",
        cancelButtonColor: "#6c757d",
      }).then((result) => {
        if (result.isConfirmed && bookingDataObj.touristId && bookingDataObj.packageId) {
          navigate(`/booking-summary/${bookingDataObj.touristId}/${bookingDataObj.packageId}`, {
            state: {
              touristId: bookingDataObj.touristId,
              packageDetails: bookingDataObj.packageDetails,
              centreDetails: bookingDataObj.centreDetails,
            },
          });
        } else {
          navigate("/signin");
        }
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Email Verified! ✅",
        text: "Your email has been verified successfully. Please login to continue.",
        confirmButtonColor: "#ff6b35",
      }).then(() => {
        navigate("/signin");
      });
    }
  };

  const handleResendOTP = () => {
    if (!canResend) {
      Swal.fire({
        icon: "info",
        title: "Please Wait",
        text: "Please wait a moment before requesting another OTP.",
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email not found. Please sign up again.",
        confirmButtonColor: "#ff6b35",
      });
      navigate("/signup");
      return;
    }

    // UI-only: no request is made.
    Swal.fire({
      icon: "success",
      title: "OTP Resent!",
      text: "A new verification code has been sent to your email.",
      confirmButtonColor: "#ff6b35",
    });

    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    document.getElementById("otp-0")?.focus();

    setTimeout(() => {
      setCanResend(true);
    }, 59000);
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        
        <div className="login-panel">
          <Image />
        </div>

        <div className="rightLogin-panel">
          <h2>Confirm OTP for Verification</h2>
          
          <p className="verify-description">
            Please enter the OTP sent to <strong>{email || "your email"}</strong> for confirmation
          </p>

          <div className="verify-email-text">Verify Your Email</div>

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>

          <button 
            type="button" 
            className="signup-btn verify-btn" 
            onClick={handleVerify}
            disabled={otp.join("").length !== 6}
                      >
            Verify
          </button>

          <button 
            type="button" 
            className="resend-btn" 
            onClick={handleResendOTP}
            disabled={!canResend}
            style={{
              background: "none",
              border: "none",
              color: canResend ? "#ff6b35" : "#999",
              cursor: canResend ? "pointer" : "not-allowed",
              marginTop: "15px",
              textDecoration: "underline"
            }}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
