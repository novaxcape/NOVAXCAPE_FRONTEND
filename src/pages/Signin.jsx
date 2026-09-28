import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import "./styles/Signin.css";

function Signin({
  onSubmit = () => {},
  onGoogleSignIn = () => {},
  isSubmitting = false,
  serverError = "",
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!values.password) {
      errors.password = "Password is required.";
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
    <div className="signin-page">
      <div className="signin-image-section">
        <img
          src="/novapics/signup.jpg"
          alt="A traveler with a backpack looking out over mountains and a river"
          className="signin-hero-image"
        />
        <div className="signin-image-overlay">
          <h2 className="signin-image-heading">Welcome Back!</h2>
          <p className="signin-image-text">
            Good to see you again. Sign in to pick up where you left off and
            continue exploring the best tourism experiences Nigeria has to
            offer.
          </p>
        </div>
      </div>

      <div className="signin-form-section">
        <h1 className="signin-form-heading">Sign In</h1>

        {serverError ? (
          <p className="signin-server-error" role="alert">
            {serverError}
          </p>
        ) : null}

        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          <div className="signin-field">
            <label htmlFor="email" className="signin-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="signin-input"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email ? (
              <span id="email-error" className="signin-error-text">
                {fieldErrors.email}
              </span>
            ) : null}
          </div>

          <div className="signin-field">
            <label htmlFor="password" className="signin-label">
              Password
            </label>
            <div className="signin-password-wrapper">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Input password"
                className="signin-input"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="signin-password-toggle"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {fieldErrors.password ? (
              <span id="password-error" className="signin-error-text">
                {fieldErrors.password}
              </span>
            ) : null}
          </div>

          <div className="signin-forgot-row">
            <a href="/forgot-password" className="signin-inline-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signin-submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <div className="signin-divider">
            <span className="signin-divider-line" />
            <span className="signin-divider-text">Or Continue with</span>
            <span className="signin-divider-line" />
          </div>

          <button
            type="button"
            className="signin-google-button"
            onClick={onGoogleSignIn}
            disabled={isSubmitting}
          >
            <FcGoogle size={24} />
            <span>Google</span>
          </button>

          <p className="signin-signup-prompt">
            Dont have an account?{" "}
            <a href="/signup" className="signin-inline-link">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;