// SignUp.jsx
import React, { useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2"; // UNCOMMENT THIS LINE
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../Styles/SignUpVendor.css";


const signUpSchema = z
  .object({
    centerName: z.string().min(2, "Center name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().min(7, "Phone number must be at least 7 digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpVendor = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const [formData, setFormData] = useState({
    centerName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTermsChange = (e) => {
    setAgreeTerms(e.target.checked);
    if (e.target.checked) {
      setTermsError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      localStorage.setItem("centerName", formData.centerName)
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all fields correctly.",
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    if (!agreeTerms) {
      setTermsError("You must agree to the Terms & Conditions and Privacy Policy.");
      Swal.fire({
        icon: "warning",
        title: "Terms Required",
        text: "Please agree to the Terms & Conditions and Privacy Policy to continue.",
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    setErrors({});
    setTermsError("");
    // UI-only: no request is made.
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Vendor account created successfully. Please verify your email.",
      confirmButtonColor: "#ff6b35",
    });

    navigate("/vendor/verify-otp", { state: { email: formData.email } });
  };
  return (
    <div className="signup_wrapper">
      <div className="signupBody">
        <div className="signupLeft">
          <img src="/novaxcape/img.png" alt="Signup" />
        </div>

        <div className="signupRight">
          <form onSubmit={handleSubmit}>
            <h1 className="signupTitle">Vendor Sign Up</h1>


            <div className="field">
              <label>Centre Name</label>
              <input
                type="text"
                name="centerName"
                placeholder="Enter your centre name"
                value={formData.centerName}
                onChange={handleChange}
              />
              {errors.centerName && (
                <span className="error">{errors.centerName}</span>
              )}
            </div>

            <div className="field">
              <label>Centre Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your centre email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="field">
              <label>Centre Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your centre phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="field">
              <label>Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Input password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="eyeIcon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
              <p className="passwordHint">
                Must contain uppercase, lowercase, number and special character.
              </p>
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <div className="passwordWrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="eyeIcon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="terms">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={handleTermsChange}
              />
              <label htmlFor="terms">
                I agree to the <a href="#!">Terms & Conditions</a> and{" "}
                <a href="#!">Privacy Policy</a>
              </label>
            </div>
            {termsError && <span className="termsError">{termsError}</span>}

            <button
              type="submit"
              className="signupBtn"
              
            >
              Sign Up
            </button>

            <p className="signinText">
              Have an account?
              <span
                onClick={() => navigate("/vendor/login")}
                style={{ cursor: "pointer" }}
              >
                {" "}
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpVendor;