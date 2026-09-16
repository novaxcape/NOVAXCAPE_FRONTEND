import { useState } from "react";
import "./css/ForgotPassword.css";

function ForgotPassword({
  onSubmit = () => {},
  isSubmitting = false,
  serverError = "",
}) {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");

  function handleChange(event) {
    setEmail(event.target.value);
    if (fieldError) {
      setFieldError("");
    }
  }

  function validate(value) {
    if (!value.trim()) {
      return "Email is required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Enter a valid email address.";
    }
    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const error = validate(email);
    setFieldError(error);

    if (!error) {
      onSubmit({ email });
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-image-section">
        <img
          src="/novapics/signup.jpg"
          alt="A traveler with a backpack looking out over mountains and a river"
          className="forgot-password-hero-image"
        />
        <div className="forgot-password-image-overlay">
          <h2 className="forgot-password-image-heading">Forgot Password?</h2>
          <p className="forgot-password-image-text">
            No worries! It happens. Enter the Email address associated with
            your account to receive OTP code.
          </p>
        </div>
      </div>

      <div className="forgot-password-form-section">
        <h1 className="forgot-password-form-heading">Enter Email</h1>

        {serverError ? (
          <p className="forgot-password-server-error" role="alert">
            {serverError}
          </p>
        ) : null}

        <form className="forgot-password-form" onSubmit={handleSubmit} noValidate>
          <div className="forgot-password-field">
            <label htmlFor="email" className="forgot-password-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="forgot-password-input"
              value={email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldError)}
              aria-describedby={fieldError ? "email-error" : undefined}
            />
            {fieldError ? (
              <span id="email-error" className="forgot-password-error-text">
                {fieldError}
              </span>
            ) : null}
          </div>

          <button
            type="submit"
            className="forgot-password-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;