// components/WelcomeSection.jsx

const WelcomeSection = () => {
  // UI-only build: static placeholder name
  const displayName = "Vendor";

  return (
    <section className="welcome-section">
      <div>
        <h1>Welcome back, {displayName}</h1>
        <p>
          Here's an overview of your bookings, tickets and revenue performance
        </p>
      </div>
      <button className="manage-centre-btn">
        Manage Centre
      </button>
    </section>
  );
};

export default WelcomeSection;
