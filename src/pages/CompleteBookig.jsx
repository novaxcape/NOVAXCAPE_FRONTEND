import React, { useState } from 'react';
import './styles/CompleteBooking.css';

export default function CompleteBooking() {
  // State for ticket quantities
  const [tickets, setTickets] = useState({
    adult: 1,
    child: 1,
    family: 1,
  });

  const [visitDate, setVisitDate] = useState('');

  // Ticket configuration
  const ticketConfig = {
    adult: { name: 'Adult', desc: 'Ages 18+ - ₦2,500', price: 2500 },
    child: { name: 'Child', desc: 'Ages 5-7 - ₦1,500', price: 1500 },
    family: { name: 'Family pack', desc: '2 Adults + 2 Childrens - ₦7,000', price: 7000 },
  };

  // Handle quantity changes
  const handleQuantity = (type, delta) => {
    setTickets((prev) => {
      const newValue = prev[type] + delta;
      return { ...prev, [type]: newValue < 0 ? 0 : newValue };
    });
  };

  // Calculate totals
  const subtotal = Object.keys(tickets).reduce((acc, key) => {
    return acc + tickets[key] * ticketConfig[key].price;
  }, 0);

  const serviceFee = 500;
  const total = subtotal + serviceFee;

  return (
    <div className="cb-page-wrapper">

      {/* Main Page Header */}
      <div className="cb-header">
        <h1>Complete Your booking</h1>
        <p>Just a few more steps to your booking</p>
      </div>

      <div className="cb-layout-grid">

        {/* Left Column: Form */}
        <div className="cb-form-column">

          {/* Date Selection */}
          <div className="cb-section-card">
            <h3>Select Visit Date</h3>
            <div className="cb-input-wrapper">
              <input
                type="text"
                className="cb-date-input"
                placeholder="mm/dd/yyyy"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = 'text';
                }}
              />
              <span className="cb-calendar-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
            </div>
          </div>

          {/* Ticket Selection */}
          <div className="cb-section-card">
            <h3>Select Ticket</h3>
            <div className="cb-ticket-list">

              {Object.entries(ticketConfig).map(([key, config]) => (
                <div className="cb-ticket-item" key={key}>
                  <div className="cb-ticket-info">
                    <span className="cb-ticket-name">{config.name}</span>
                    <span className="cb-ticket-desc">{config.desc}</span>
                  </div>
                  <div className="cb-ticket-counter">
                    <button
                      className="cb-counter-btn"
                      onClick={() => handleQuantity(key, -1)}
                      disabled={tickets[key] === 0}
                      aria-label={`Decrease ${config.name} quantity`}
                    >
                      &minus;
                    </button>
                    <span className="cb-counter-value" key={tickets[key]}>{tickets[key]}</span>
                    <button
                      className="cb-counter-btn"
                      onClick={() => handleQuantity(key, 1)}
                      aria-label={`Increase ${config.name} quantity`}
                    >
                      &#43;
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="cb-summary-column">
          <h3>Booking Summary</h3>

          <div className="cb-summary-items">
            {Object.entries(tickets).map(([key, quantity]) => {
              if (quantity === 0) return null;
              const config = ticketConfig[key];
              return (
                <div className="cb-summary-row" key={key}>
                  <div className="cb-summary-label">
                    <span className="cb-summary-title">{config.name} x {quantity}</span>
                    <span className="cb-summary-sub">₦{config.price.toLocaleString()} each</span>
                  </div>
                  <span className="cb-summary-amount">
                    ₦{(quantity * config.price).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="cb-summary-divider"></div>

          <div className="cb-summary-row cb-summary-row-light">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="cb-summary-row cb-summary-row-light">
            <span>Service fee</span>
            <span>₦{serviceFee.toLocaleString()}</span>
          </div>

          <div className="cb-summary-divider"></div>

          <div className="cb-summary-row cb-summary-total-row">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <button className="cb-continue-btn">Continue To Payment</button>
          <button className="cb-installment-btn">Or Pay Instalmentally</button>
        </div>

      </div>
    </div>
  );
}
