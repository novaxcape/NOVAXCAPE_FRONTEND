import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import "./css/Signup.css";

function Signup({
  onSubmit = () => {},
  onGoogleSignUp = () => {},
  isSubmitting = false,
  serverError = "",
}) {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    phoneNumber: "",
    agreedToTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setFormData((previous) => ({ ...previous, [name]: nextValue }));

    if (fieldErrors[name]) {
      setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!values.firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!values.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    }

    if (!values.agreedToTerms) {
      errors.agreedToTerms = "You must accept the terms to continue.";
    }

    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validate(formData);
    setFieldErrors(errors);

    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) {
      onSubmit(formData);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-image-section">
        <img
          src="/novapics/signup.jpg"
          alt="A traveler with a backpack looking out over mountains and a river"
          className="signup-hero-image"
        />
        <div className="signup-image-overlay">
          <h2 className="signup-image-heading">Create Your account</h2>
          <p className="signup-image-text">
            Start your journey to unforgettable memories. Join thousands of
            explorers discovering the best of Nigeria.
          </p>
        </div>
      </div>

      <div className="signup-form-section">
        <h1 className="signup-form-heading">Sign Up</h1>

        {serverError ? (
          <p className="signup-server-error" role="alert">
            {serverError}
          </p>
        ) : null}

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="lastName" className="signup-label">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your Name"
              className="signup-input"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.lastName)}
              aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
            />
            {fieldErrors.lastName ? (
              <span id="lastName-error" className="signup-error-text">
                {fieldErrors.lastName}
              </span>
            ) : null}
          </div>

          <div className="signup-field">
            <label htmlFor="firstName" className="signup-label">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your Name"
              className="signup-input"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.firstName)}
              aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
            />
            {fieldErrors.firstName ? (
              <span id="firstName-error" className="signup-error-text">
                {fieldErrors.firstName}
              </span>
            ) : null}
          </div>

          <div className="signup-field">
            <label htmlFor="email" className="signup-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="signup-input"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email ? (
              <span id="email-error" className="signup-error-text">
                {fieldErrors.email}
              </span>
            ) : null}
          </div>

          <div className="signup-field">
            <label htmlFor="password" className="signup-label">
              Password
            </label>
            <div className="signup-password-wrapper">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Input password"
                className="signup-input"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="signup-password-toggle"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {fieldErrors.password ? (
              <span id="password-error" className="signup-error-text">
                {fieldErrors.password}
              </span>
            ) : null}
          </div>

          <div className="signup-field">
            <label htmlFor="phoneNumber" className="signup-label">
              Phone number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Input phone number"
              className="signup-input"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.phoneNumber)}
              aria-describedby={fieldErrors.phoneNumber ? "phoneNumber-error" : undefined}
            />
            {fieldErrors.phoneNumber ? (
              <span id="phoneNumber-error" className="signup-error-text">
                {fieldErrors.phoneNumber}
              </span>
            ) : null}
          </div>

          <div className="signup-checkbox-row">
            <input
              id="agreedToTerms"
              name="agreedToTerms"
              type="checkbox"
              className="signup-checkbox"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.agreedToTerms)}
            />
            <label htmlFor="agreedToTerms" className="signup-checkbox-label">
              I agree to the{" "}
              <a href="/terms" className="signup-inline-link">
                terms and condition
              </a>{" "}
              &{" "}
              <a href="/privacy" className="signup-inline-link">
                privacy policy
              </a>
            </label>
          </div>
          {fieldErrors.agreedToTerms ? (
            <span className="signup-error-text">{fieldErrors.agreedToTerms}</span>
          ) : null}

          <button type="submit" className="signup-submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="signup-divider">
            <span className="signup-divider-line" />
            <span className="signup-divider-text">Or Continue with</span>
            <span className="signup-divider-line" />
          </div>

          <button
            type="button"
            className="signup-google-button"
            onClick={onGoogleSignUp}
            disabled={isSubmitting}
          >
            <FcGoogle size={24} />
            <span>Google</span>
          </button>

          <p className="signup-signin-prompt">
            Have an account?{" "}
            <a href="/signin" className="signup-inline-link">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;