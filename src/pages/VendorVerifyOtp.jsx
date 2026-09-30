// Pages/Vendor/VendorVerifyOtp.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Swal from "sweetalert2";

import "../Styles/SignUpVendor.css";


const VendorVerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [canResend, setCanResend] = useState(true);

  React.useEffect(() => {
    if (!email) {
      navigate("/signupvendor");
    }
  }, [email, navigate]);

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

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setError("");

    // UI-only: no request is made; any complete code is accepted.
    Swal.fire({
      icon: "success",
      title: "Verification Successful!",
      text: "Your vendor account has been verified. You can now add your centre.",
      confirmButtonColor: "#ff6b35",
    });

    navigate("/add-centre");
  };

  const handleResendOTP = () => {
    if (!canResend) {
      Swal.fire({
        icon: "info",
        title: "Please Wait",
        text: "Please wait before requesting another OTP.",
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    setError("");
    setCanResend(false);

    // UI-only: no request is made.
    Swal.fire({
      icon: "success",
      title: "OTP Resent!",
      text: "A new verification code has been sent to your email.",
      confirmButtonColor: "#ff6b35",
    });

    setOtp(["", "", "", "", "", ""]);
    document.getElementById("otp-0")?.focus();

    // Re-enable resend after 5 minutes
    setTimeout(() => {
      setCanResend(true);
    }, 300000);
  };
  return (
    <main className="signup_wrapper">
      <div className="signupBody">
        <div className="signupLeft">
          <img src="/novaxcape/img.png" alt="Verification" />
        </div>

        <div className="signupRight">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="signupTitle">Verify Email</h1>

            <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
              We've sent a code to:
              <br />
              <strong style={{ color: "#ff6b35" }}>{email || "your email"}</strong>
            </p>

            {error && (
              <div className="error" style={{ textAlign: "center", marginBottom: "15px" }}>
                {error}
              </div>
            )}

            <div className="field">
              <label>Verification Code</label>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                      width: "50px",
                      height: "50px",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="signupBtn"
              onClick={handleVerify}
              disabled={otp.join("").length !== 6}
            >
              Verify Email
            </button>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>Didn't receive a code? </span>
              <span
                onClick={handleResendOTP}
                style={{
                  color: canResend ? "#ff6b35" : "#999",
                  cursor: canResend ? "pointer" : "not-allowed",
                  textDecoration: "underline",
                }}
              >
                {canResend ? "Resend Code" : "Resend Code"}
              </span>
            </div>

            <p className="signinText" style={{ marginTop: "30px" }}>
              Already have an account? <Link to="/vendor/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default VendorVerifyOtp;
