import {  FiUser, FiBriefcase, FiCheck } from "react-icons/fi";
import "./styles/SignupScreen.css";

const USER_FEATURES = [
  "Browse tourism centers and attractions",
  "Instant booking and confirmation",
  "Exclusive deals and offers",
];

const VENDOR_FEATURES = [
  "Manage bookings and reservations",
  "Automated payment processing",
  "Marketing and promotion support",
];

function RoleCard({ variant, icon, title, description, features, onGetStarted }) {
  return (
    <div className={`signup-screen-card signup-screen-card--${variant}`}>
      <div className={`signup-screen-icon-circle signup-screen-icon-circle--${variant}`}>
        {icon}
      </div>

      <h2 className="signup-screen-card-title">{title}</h2>
      <p className="signup-screen-card-description">{description}</p>

      <ul className="signup-screen-feature-list">
        {features.map((feature) => (
          <li key={feature} className="signup-screen-feature-item">
            <span className={`signup-screen-feature-check signup-screen-feature-check--${variant}`}>
              <FiCheck size={12} color="#ffffff" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`signup-screen-get-started signup-screen-get-started--${variant}`}
        onClick={onGetStarted}
      >
        Get Started →
      </button>
    </div>
  );
}

function SignupScreen({ onSelectUser = () => {}, onSelectVendor = () => {} }) {
  return (
    <div className="signup-screen-page">
      <div className="signup-screen-header">
        <div className="signup-screen-logo">
          <img
          src="/novapics/logo.png"
          alt="logo"
          className="logo"
        />
          <span className="signup-screen-logo-nova">Nova</span><span className="signup-screen-logo-xcape">Xcape</span>
        </div>

        <h1 className="signup-screen-heading">Welcome to NovaXcape</h1>
        <p className="signup-screen-subheading">
          Choose how you'd like to join our community
        </p>
      </div>

      <div className="signup-screen-cards">
        <RoleCard
          variant="user"
          icon={<FiUser size={48} color="#ffffff" />}
          title="Sign Up as User"
          description="Discover and book amazing tourism experiences across Nigeria"
          features={USER_FEATURES}
          onGetStarted={onSelectUser}
        />
        <RoleCard
          variant="vendor"
          icon={<img
          src="/novapics/Icon.png"
          alt="icon"
          className="icon"
        />}
          title="Sign Up as Vendor"
          description="List your tourism center and reach thousands of travelers"
          features={VENDOR_FEATURES}
          onGetStarted={onSelectVendor}
        />
      </div>
    </div>
  );
}

export default SignupScreen;