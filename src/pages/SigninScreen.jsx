import { FiUser, FiArrowRight } from "react-icons/fi";
import "./styles/SigninScreen.css";

const ACCOUNT_OPTIONS = [
  {
    id: "user",
    title: "Sign in as User",
    description:
      "Discover and book amazing tourism experiences across Nigeria",
  },
  {
    id: "vendor",
    title: "Sign in as Vendor",
    description: "List your tourism center and reach thousands of travelers",
  },
];

function SignInScreen({ onSelect }) {
  return (
    <main className="signin-screen">
      <header className="signin-screen__header">
        <div className="signin-screen__brand">
          <img
            className="signin-screen__logo"
            src="/novapics/logo.png"
            alt=""
          />
          <span className="signin-screen__brand-name">
            <span className="signin-screen__brand-nova">Nova</span>
            <span className="signin-screen__brand-xcape">Xcape</span>
          </span>
        </div>
        <h1 className="signin-screen__title">Welcome to NovaXcape</h1>
        <p className="signin-screen__subtitle">Sign in to our community</p>
      </header>

      <section className="signin-screen__options">
        {ACCOUNT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`signin-card signin-card--${option.id}`}
            onClick={() => onSelect?.(option.id)}
          >
            <span className="signin-card__icon" aria-hidden="true">
              {option.id === "user" ? (
                <FiUser className="signin-card__icon-svg" />
              ) : (
                <img
                  className="signin-card__icon-img"
                  src="/novapics/Icon.png"
                  alt=""
                />
              )}
            </span>

            <span className="signin-card__title">{option.title}</span>
            <span className="signin-card__description">
              {option.description}
            </span>

            <span className="signin-card__action">
              Get Started
              <FiArrowRight aria-hidden="true" />
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}

export default SignInScreen;