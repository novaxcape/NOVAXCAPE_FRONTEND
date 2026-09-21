import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./styles/ResetPassword.css";

function ResetPassword({
  onSubmit = () => {},
  isSubmitting = false,
  serverError = "",
}) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (values.password && values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match.";
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
    <div className="reset-password-page">
      <div className="reset-password-image-section">
        <img
          src="/novapics/signup.jpg"
          alt="A traveler with a backpack looking out over mountains and a river"
          className="reset-password-hero-image"
        />
        <div className="reset-password-image-overlay">
          <h2 className="reset-password-image-heading">Create new password</h2>
          <p className="reset-password-image-text">
            Enter your new password twice below to reset a new password.
            Your password must be different than previous used passwords.
          </p>
        </div>
      </div>

      <div className="reset-password-form-section">
        <h1 className="reset-password-form-heading">Reset Password</h1>

        {serverError ? (
          <p className="reset-password-server-error" role="alert">
            {serverError}
          </p>
        ) : null}

        <form className="reset-password-form" onSubmit={handleSubmit} noValidate>
          <div className="reset-password-field">
            <label htmlFor="password" className="reset-password-label">
              Password
            </label>
            <div className="reset-password-password-wrapper">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Input password"
                className="reset-password-input"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="reset-password-toggle"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {fieldErrors.password ? (
              <span id="password-error" className="reset-password-error-text">
                {fieldErrors.password}
              </span>
            ) : null}
          </div>

          <div className="reset-password-field">
            <label htmlFor="confirmPassword" className="reset-password-label">
              Confirm Password
            </label>
            <div className="reset-password-password-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Input password"
                className="reset-password-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.confirmPassword)}
                aria-describedby={
                  fieldErrors.confirmPassword ? "confirmPassword-error" : undefined
                }
              />
              <button
                type="button"
                className="reset-password-toggle"
                onClick={() =>
                  setIsConfirmPasswordVisible((visible) => !visible)
                }
                aria-label={
                  isConfirmPasswordVisible ? "Hide password" : "Show password"
                }
              >
                {isConfirmPasswordVisible ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
            {fieldErrors.confirmPassword ? (
              <span id="confirmPassword-error" className="reset-password-error-text">
                {fieldErrors.confirmPassword}
              </span>
            ) : null}
          </div>

          <button
            type="submit"
            className="reset-password-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;