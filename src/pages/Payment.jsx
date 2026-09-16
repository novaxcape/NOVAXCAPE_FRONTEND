import React, { useState } from 'react';
import './styles/Payment.css';

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to 1 month

  const plans = [
    { id: 1, duration: '1 Month', amount: '₦ 4,667', period: 'Per week' },
    { id: 2, duration: '2 Months', amount: '₦ 3,667', period: 'Per month' },
    { id: 3, duration: '3 Months', amount: '₦ 2,167', period: 'Per month' },
  ];

  return (
    <div className="payment-container">
      {/* Back Button */}
      <button className="payment-back-btn">Back</button>

      {/* Header */}
      <div className="payment-header">
        <h1>Payment</h1>
        <p>Choose your payment plan and complete your booking</p>
      </div>

      {/* Payment Method Card */}
      <div className="payment-method-card">
        <div className="payment-icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M8 14h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M16 14h.01"></path>
            <path d="M8 18h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M16 18h.01"></path>
          </svg>
        </div>
        <h3>Installment Payment</h3>
        <p>Split payment into smaller amount</p>
        <span className="payment-badge">Flexible plan Available</span>
      </div>

      <div className="payment-layout-grid">
        {/* Left Column: Choose Plan */}
        <div className="payment-plans-section">
          <h3>Choose installment Plan</h3>
          <div className="payment-plans-list">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`payment-plan-item ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="payment-radio-wrapper">
                  <div className={`payment-radio-circle ${selectedPlan === plan.id ? 'active' : ''}`}></div>
                </div>
                <div className="payment-plan-details">
                  <div className="payment-plan-duration">{plan.duration}</div>
                  <div className="payment-plan-period">Monthly payment</div>
                </div>
                <div className="payment-plan-price">
                  <div className="payment-price-amount">{plan.amount}</div>
                  <div className="payment-price-period">{plan.period}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="payment-info-box">
            <div className="payment-info-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="payment-info-text">
              <strong>Installment plan detail</strong>
              <p>First payment due today, following payments will be automatically charged monthly.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Summary */}
        <div className="payment-summary-section">
          <h3>Booking Summary</h3>
          
          <div className="payment-summary-row">
            <span>Ticket total</span>
            <span>₦ 11,000</span>
          </div>
          <div className="payment-summary-row">
            <span>Interest</span>
            <span>₦ 1000</span>
          </div>

          <div className="payment-summary-highlight">
            <div className="payment-highlight-top">
              <span>Ticket total</span>
              <span className="payment-highlight-amount">₦ 3,667</span>
            </div>
            <div className="payment-highlight-bottom">
              <span>Due today - 2 Months</span>
            </div>
          </div>

          <div className="payment-summary-total">
            <span>Due date</span>
            <span>₦ 3,667</span>
          </div>

          <button className="payment-continue-btn">Continue To Payment</button>
          
          <div className="payment-secure-text">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Your payment is encrypted and secure
          </div>
        </div>
      </div>
    </div>
  );
}