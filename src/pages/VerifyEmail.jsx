import { useState, useEffect, useRef } from "react";
import "./styles/VerifyEmail.css";

const OTP_LENGTH = 6;
const RESEND_WAIT_SECONDS = 60;

function VerifyEmail({
  email,
  onVerify = () => {},
  onResend = () => {},
  isSubmitting = false,
  serverError = "",
}) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_WAIT_SECONDS);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft === 0) {
      return;
    }

    const timerId = setTimeout(() => {
      setSecondsLeft((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [secondsLeft]);

  function handleDigitChange(index, event) {
    const value = event.target.value.replace(/\D/g, "");

    if (!value) {
      setDigits((previous) => {
        const next = [...previous];
        next[index] = "";
        return next;
      });
      return;
    }

    const lastChar = value.slice(-1);

    setDigits((previous) => {
      const next = [...previous];
      next[index] = lastChar;
      return next;
    });

    if (otpError) {
      setOtpError("");
    }

    const nextInput = inputRefs.current[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const previousInput = inputRefs.current[index - 1];
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  function handlePaste(event) {
    const pastedText = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedText) {
      return;
    }

    event.preventDefault();

    const pastedDigits = pastedText.slice(0, OTP_LENGTH).split("");
    setDigits((previous) => {
      const next = [...previous];
      pastedDigits.forEach((digit, index) => {
        next[index] = digit;
      });
      return next;
    });

    const lastFilledIndex = Math.min(pastedDigits.length, OTP_LENGTH) - 1;
    const targetInput = inputRefs.current[lastFilledIndex];
    if (targetInput) {
      targetInput.focus();
    }
  }

  function handleResendClick() {
    if (secondsLeft > 0) {
      return;
    }
    setSecondsLeft(RESEND_WAIT_SECONDS);
    setDigits(Array(OTP_LENGTH).fill(""));
    setOtpError("");
    onResend();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setOtpError("Enter the full 6-digit code.");
      return;
    }

    onVerify(code);
  }

  return (
    <div className="verify-email-page">
      <div className="verify-email-image-section">
        <img
          src="/novapics/signup.jpg"
          alt="A traveler with a backpack looking out over mountains and a river"
          className="verify-email-hero-image"
        />
        <div className="verify-email-image-overlay">
          <h2 className="verify-email-image-heading">
            Confirm OTP for Verification
          </h2>
          <p className="verify-email-image-text">
            Please enter the OTP sent to {email} for confirmation
          </p>
        </div>
      </div>

      <div className="verify-email-form-section">
        <h1 className="verify-email-form-heading">Verify Your Email</h1>

        {serverError ? (
          <p className="verify-email-server-error" role="alert">
            {serverError}
          </p>
        ) : null}

        <form className="verify-email-form" onSubmit={handleSubmit} noValidate>
          <div className="verify-email-otp-row" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="verify-email-otp-box"
                value={digit}
                onChange={(event) => handleDigitChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                disabled={isSubmitting}
                aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                aria-invalid={Boolean(otpError)}
              />
            ))}
          </div>
          {otpError ? (
            <span className="verify-email-error-text">{otpError}</span>
          ) : null}

          <p className="verify-email-resend-text">
            {secondsLeft > 0 ? (
              <>
                We'll resend OTP in{" "}
                <span className="verify-email-resend-timer">{secondsLeft}s</span>
              </>
            ) : (
              <button
                type="button"
                className="verify-email-resend-link"
                onClick={handleResendClick}
              >
                Resend OTP
              </button>
            )}
          </p>

          <button
            type="submit"
            className="verify-email-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;