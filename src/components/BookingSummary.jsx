import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./css/BookingSummary.css";

const SERVICE_FEE = 500;

// UI-only build: static sample package used when none is passed via navigation state
const SAMPLE_PACKAGE = {
  id: "pkg-sample",
  packageName: "Standard Entry",
  packages: [
    { id: "pkg-adult", packageType: "Adult", amount: 2500, description: "Ages 18+ - ₦2,500" },
    { id: "pkg-child", packageType: "Child", amount: 1500, description: "Ages 5-17 - ₦1,500" },
    { id: "pkg-family", packageType: "Family pack", amount: 7000, description: "2 Adults + 2 Children - ₦7,000" },
  ],
};


const getPackageTouristId = (pkg, centre, fallbackId) =>
  pkg?.touristId ||
  pkg?.tourist?.id ||
  pkg?.tourist?._id ||
  pkg?.touristCentre?.id ||
  pkg?.touristCentre?._id ||
  centre?.touristId ||
  centre?.id ||
  centre?._id ||
  fallbackId;

const getLocalDateInputValue = (dateValue = new Date()) => {
  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, "0");
  const day = String(dateValue.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateInputValue = (dateValue) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue || "")) {
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
};

const getVisitDateError = (dateValue, minimumDateValue) => {
  if (!dateValue) {
    return "Please select a visit date.";
  }

  const selectedDate = parseDateInputValue(dateValue);
  const minimumDate = parseDateInputValue(minimumDateValue);

  if (!selectedDate) {
    return "Please enter a valid visit date.";
  }

  if (minimumDate && selectedDate < minimumDate) {
    return "Please select today or a future visit date.";
  }

  return "";
};

export default function BookingSummaryPage() {
  const navigate = useNavigate();
  const { touristId, packageId } = useParams();
  const location = useLocation();

  const [bookingData, setBookingData] = useState({
    packageDetails: location.state?.packageDetails || null,
    centreDetails: location.state?.centreDetails || null,
  });

  const [date, setDate] = useState("");
  const [quantities, setQuantities] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const minimumVisitDate = useMemo(() => getLocalDateInputValue(), []);

  const bookingTouristId = getPackageTouristId(
    packageData || bookingData.packageDetails,
    bookingData.centreDetails,
    touristId
  );

  console.log("📄 BookingSummaryPage - Mounted");
  console.log("📄 touristId:", touristId);
  console.log("📄 packageId:", packageId);

  // Use the package passed via navigation state, otherwise fall back to sample data
  useEffect(() => {
    const pkg = location.state?.packageDetails || SAMPLE_PACKAGE;
    setPackageData(pkg);
    setBookingData((prev) => ({
      ...prev,
      packageDetails: pkg,
      centreDetails: location.state?.centreDetails || prev.centreDetails,
    }));
    generateTicketTypes(pkg);
  }, [location.state]);
  const generateTicketTypes = (pkg, plans = []) => {
    console.log("🔄 Generating ticket types from:", { pkg, plans });
    
    let types = [];

    if (plans && plans.length > 0) {
      types = plans.map((plan, index) => ({
        id: plan.id || `plan-${index}`,
        label: plan.planName || plan.name || `Plan ${index + 1}`,
        description: plan.description || `${plan.planName || 'Package'} - ₦${(plan.amount || 0).toLocaleString()}`,
        price: plan.amount || plan.price || 0,
        planId: plan.id,
        isInstallment: plan.isInstallment || false,
      }));
    } else if (pkg?.packages && Array.isArray(pkg.packages) && pkg.packages.length > 0) {
      types = pkg.packages.map((pkgItem, index) => ({
        id: pkgItem.id || `pkg-${index}`,
        label: pkgItem.packageType || pkgItem.name || `Package ${index + 1}`,
        description: pkgItem.description || `${pkgItem.packageType || 'Package'} - ₦${(pkgItem.amount || 0).toLocaleString()}`,
        price: pkgItem.amount || pkgItem.price || 0,
        packageId: pkgItem.id,
      }));
    } else if (pkg?.ticketTypes && Array.isArray(pkg.ticketTypes)) {
      types = pkg.ticketTypes.map((ticket, index) => ({
        id: ticket.id || `ticket-${index}`,
        label: ticket.name || ticket.label || `Ticket ${index + 1}`,
        description: ticket.description || `${ticket.name || 'Ticket'} - ₦${(ticket.price || 0).toLocaleString()}`,
        price: ticket.price || 0,
      }));
    } else if (pkg?.amount || pkg?.price) {
      const amount = pkg.amount || pkg.price || 0;
      types = [{
        id: 'standard',
        label: 'Standard Ticket',
        description: `${pkg.packageName || pkg.name || 'Package'} - ₦${amount.toLocaleString()}`,
        price: amount,
      }];
    }

    console.log("✅ Generated ticket types:", types);
    setTicketTypes(types);

    const initialQuantities = {};
    types.forEach((ticket, index) => {
      initialQuantities[ticket.id] = index === 0 ? 1 : 0;
    });
    setQuantities(initialQuantities);
  };

  const fallbackTicketTypes = useMemo(() => [
    {
      id: "adult",
      label: "Adult",
      description: "Ages 18+ - N2,500",
      price: 2500,
    },
    {
      id: "child",
      label: "Child",
      description: "Ages 5-7 - N1,500",
      price: 1500,
    },
    {
      id: "family",
      label: "Family pack",
      description: "2 Adults + 2 Childrens - N7,000",
      price: 7000,
    },
  ], []);

  const displayTicketTypes = ticketTypes.length > 0 ? ticketTypes : fallbackTicketTypes;


  // ✅ Restore from localStorage if needed
  useEffect(() => {
    if (!bookingData.packageDetails) {
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        try {
          const parsed = JSON.parse(pendingBooking);
          setBookingData({
            packageDetails: parsed.packageDetails,
            centreDetails: parsed.centreDetails,
          });
          setPackageData(parsed.packageDetails);
          
          if (parsed.packageDetails) {
            generateTicketTypes(parsed.packageDetails);
          }
        } catch (e) {
          console.error("Error parsing pending booking:", e);
        }
      }
    }
  }, [bookingData.packageDetails]);

  console.log("booking data:", bookingData);
  console.log("ticket types:", displayTicketTypes);

  const increment = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const decrement = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));

  const subtotal = displayTicketTypes.reduce(
    (sum, t) => sum + t.price * (quantities[t.id] || 0),
    0,
  );
  const total = subtotal + SERVICE_FEE;

  const formatNaira = (amount) => `₦${amount.toLocaleString("en-NG")}`;

  const summaryItems = displayTicketTypes.filter(
    (t) => (quantities[t.id] || 0) > 0
  );
  const visitDateError = useMemo(
    () => getVisitDateError(date, minimumVisitDate),
    [date, minimumVisitDate]
  );
  const canContinueToPayment =
    !isProcessing &&
    !visitDateError &&
    summaryItems.length > 0;

  const handleContinueToPayment = ({ isInstallment = false } = {}) => {
    const currentVisitDateError = getVisitDateError(date, minimumVisitDate);
    if (currentVisitDateError) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: currentVisitDateError,
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    if (summaryItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Tickets Selected",
        text: "Please select at least one ticket.",
        confirmButtonColor: "#ff6b35",
      });
      return;
    }

    setIsProcessing(true);

    const [year, month, day] = date.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    const selectedTicketDetails = summaryItems.map((t) => ({
      ticketType: t.id,
      ticketLabel: t.label,
      quantity: quantities[t.id] || 0,
      price: t.price,
      amount: t.price * (quantities[t.id] || 0),
    }));
    const numberOfPeople = selectedTicketDetails.reduce(
      (sum, ticket) => sum + ticket.quantity,
      0,
    );

    // UI-only build: no booking is created; use a local placeholder id
    const bookingId = `BK-${Date.now()}`;

    const bookingState = {
      bookingId,
      amount: total,
      subtotal,
      serviceFee: SERVICE_FEE,
      centreDetails: bookingData.centreDetails,
      packageDetails: bookingData.packageDetails,
      ticketDetails: selectedTicketDetails,
      numberOfPeople,
      date: formattedDate,
      packageId,
      touristId: bookingTouristId,
      centreId: bookingTouristId,
      isInstallment,
    };

    setIsProcessing(false);
    navigate(`/payment-checkout/${bookingId}`, { state: bookingState });
  };

  if (!bookingData.packageDetails && !packageData) {
    return (
      <div className="bp-page">
        <div className="bp-header">
          <h1 className="bp-title">Complete Your Booking</h1>
          <p className="bp-subtitle">Just a few more steps to your booking</p>
        </div>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>No Booking Data Found</h2>
          <p>Please select a package to book.</p>
          <button
            onClick={() => navigate("/discover")}
            style={{
              background: "#ff6b35",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "16px",
            }}
          >
            Browse Centres
          </button>
        </div>
      </div>
    );
  }

  const displayPackage = packageData || bookingData.packageDetails;
  const displayCentre = bookingData.centreDetails;

  return (
    <div className="bp-page">
      <div className="bp-header">
        <h1 className="bp-title">Complete Your Booking</h1>
        <p className="bp-subtitle">Just a few more steps to your booking</p>

        {displayCentre && (
          <div
            className="bp-booking-info"
            style={{
              background: "#f8f9fa",
              padding: "16px 24px",
              borderRadius: "12px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>
                {displayCentre.centreName || displayCentre.name}
              </strong>
              <span style={{ marginLeft: "16px", color: "#666" }}>
                {displayCentre.city}, {displayCentre.state}
              </span>
            </div>
            <div>
              <span style={{ color: "#666" }}>
                Package: {displayPackage?.packageName || displayPackage?.name || "Package"}
              </span>
              <span
                style={{
                  marginLeft: "16px",
                  fontWeight: 600,
                  color: "#ff6b35",
                }}
              >
                ₦
                {displayPackage?.amount?.toLocaleString() ||
                  displayPackage?.price?.toLocaleString() ||
                  "0"}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bp-layout">
        <div className="bp-card bp-left-card">
          <section className="bp-section">
            <h2 className="bp-section-title">Select Visit Date</h2>
            <div className="bp-date-input-wrapper">
              <input
                type="date"
                className="bp-date-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={minimumVisitDate}
                aria-invalid={Boolean(visitDateError)}
                aria-describedby="visit-date-error"
              />
            </div>
            {visitDateError && (
              <p className="bp-error" id="visit-date-error">
                {visitDateError}
              </p>
            )}
          </section>

          <section className="bp-section">
            <h2 className="bp-section-title">Select Ticket</h2>
            <div className="bp-tickets">
              {displayTicketTypes.map((ticket) => (
                <div key={ticket.id} className="bp-ticket-row">
                  <div className="bp-ticket-info">
                    <span className="bp-ticket-label">{ticket.label}</span>
                    <span className="bp-ticket-desc">{ticket.description}</span>
                  </div>
                  <div className="bp-counter">
                    <button
                      className="bp-counter-btn"
                      onClick={() => decrement(ticket.id)}
                      aria-label={`Decrease ${ticket.label}`}
                    >
                      <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                        <path
                          d="M1 1h12"
                          stroke="#271A13"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <span className="bp-counter-value">
                      {quantities[ticket.id] || 0}
                    </span>
                    <button
                      className="bp-counter-btn"
                      onClick={() => increment(ticket.id)}
                      aria-label={`Increase ${ticket.label}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="#271A13"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="bp-card bp-right-card">
          <h2 className="bp-summary-title">Booking Summary</h2>

          {displayPackage && (
            <div className="bp-summary-package" style={{
              background: "#f8f9fa",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600 }}>
                  {displayPackage.packageName || displayPackage.name || "Package"}
                </span>
                <span style={{ color: "#ff6b35", fontWeight: 600 }}>
                  ₦{(displayPackage.amount || displayPackage.price || 0).toLocaleString()}
                </span>
              </div>
              {displayPackage.description && (
                <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
                  {displayPackage.description}
                </p>
              )}
            </div>
          )}

          <div className="bp-summary-items">
            {summaryItems.map((t) => (
              <div key={t.id} className="bp-summary-row">
                <div className="bp-summary-item-info">
                  <span className="bp-summary-item-name">
                    {t.label} x {quantities[t.id] || 0}
                  </span>
                  <span className="bp-summary-item-price-desc">
                    ₦{t.price.toLocaleString("en-NG")} each
                  </span>
                </div>
                <span className="bp-summary-item-total">
                  {formatNaira(t.price * (quantities[t.id] || 0))}
                </span>
              </div>
            ))}
          </div>

          <div className="bp-summary-divider" />

          <div className="bp-summary-fees">
            <div className="bp-fee-row">
              <span className="bp-fee-label">Subtotal</span>
              <span className="bp-fee-value">{formatNaira(subtotal)}</span>
            </div>
            <div className="bp-fee-row">
              <span className="bp-fee-label">Service fee</span>
              <span className="bp-fee-value">{formatNaira(SERVICE_FEE)}</span>
            </div>
          </div>

          <div className="bp-summary-divider" />

          <div className="bp-total-row">
            <span className="bp-total-label">Total</span>
            <span className="bp-total-value">{formatNaira(total)}</span>
          </div>

          <button
            className="bp-cta-btn"
            onClick={() => handleContinueToPayment()}
            disabled={!canContinueToPayment}
          >
            {isProcessing ? "Processing..." : "Continue To Payment"}
          </button>

          <button
            type="button"
            className="bp-installment"
            onClick={() => handleContinueToPayment({ isInstallment: true })}
            disabled={!canContinueToPayment}
          >
            or pay in installments
          </button>

        </div>
      </div>
    </div>
  );
}
