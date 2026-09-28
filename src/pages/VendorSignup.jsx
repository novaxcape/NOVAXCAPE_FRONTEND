import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './styles/VendorSignup.css';

const INITIAL_FORM_STATE = {
  email: '',
  centerName: '',
  phoneNumber: '',
  password: '',
};

const VendorSignup = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((previousValue) => !previousValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('');

    if (!hasAgreedToTerms) {
      setFormError('Please agree to the terms and condition and privacy policy to continue.');
      return;
    }

    console.log('Vendor signup form submitted:', formData);
  };

  return (
    <div className="vendor-signup-page">
      <div className="vendor-signup-content">
        <div className="vendor-signup-visual">
          <img
            src="/novapics/signup.jpg"
            alt="Explorer sitting on a rock overlooking mountains and a river"
            className="vendor-signup-image"
          />
          <div className="vendor-signup-visual-overlay">
            <h2 className="vendor-signup-visual-title">Create Your account</h2>
            <p className="vendor-signup-visual-subtitle">
              Start your journey to unforgettable memories. Join thousands of
              explorers discovering the best of Nigeria.
            </p>
          </div>
        </div>

        <div className="vendor-signup-form-wrapper">
          <form
            className="vendor-signup-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h1 className="vendor-signup-title">Sign Up</h1>

            <div className="form-field">
              <label htmlFor="email">Centre Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="centerName">Centre name</label>
              <input
                type="text"
                id="centerName"
                name="centerName"
                placeholder="Enter your name"
                value={formData.centerName}
                onChange={handleInputChange}
                autoComplete="organization"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phoneNumber">Center phone number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Input phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                autoComplete="tel"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Center password</label>
              <div className="password-input">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Input password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                  aria-pressed={isPasswordVisible}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={hasAgreedToTerms}
                onChange={(event) => setHasAgreedToTerms(event.target.checked)}
              />
              <span>
                I agree to the{' '}
                <a href="/terms">terms and condition</a> &{' '}
                <a href="/privacy">privacy policy</a>
              </span>
            </label>

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <button type="submit" className="submit-button">
              Sign Up
            </button>

            <p className="signin-prompt">
              have an account ? <a href="/signin">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;