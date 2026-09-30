import React, { useState, useEffect } from 'react';
import './css/PaymentCheckout.css';
import { LuShield } from 'react-icons/lu';
import { CiCalendar } from "react-icons/ci";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


const PaymentCheckout = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookingId = params.bookingId || params.touristId;
  const location = useLocation();

  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const storedBookingState = (() => {
    try {
      const stored = JSON.parse(localStorage.getItem("pendingBookingState") || "null");
      return stored?.bookingId === bookingId ? stored : {};
    } catch (error) {
      console.error("Error reading pending booking state:", error);
      return {};
    }
  })();

  const bookingData = location.state || storedBookingState || {};
  const isInstallment = bookingData.isInstallment || false;
  const totalAmount = bookingData.amount || bookingData.totalAmount || 0;
  const subtotal = bookingData.subtotal || 0;
  const serviceFee = bookingData.serviceFee || 0;
  const centreDetails = bookingData.centreDetails || {};
  const packageDetails = bookingData.packageDetails || {};


  // UI-only build: fixed sample installment schedule (2 payments)
  const totalInstallments = 2;
  const amountPerInstallment = Math.ceil(totalAmount / totalInstallments);
  const installmentsPaid = 0;
  const plans = isInstallment ? [
    {
      id: `installment-${totalInstallments}`,
      totalInstallments,
      installmentAmount: amountPerInstallment,
      installmentsPaid,
    }
  ] : [];

  useEffect(() => {
    if (isInstallment && plans.length === 1 && !selectedPlanId) {
      setSelectedPlanId(plans[0].id);
      setSelectedPlan(plans[0]);
    }
  }, [isInstallment, plans.length]);


  const formatNaira = (amount) => {
    if (!amount) return '₦0';
    return `₦${Number(amount).toLocaleString('en-NG')}`;
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
    const plan = plans.find(p => p.id === planId);
    setSelectedPlan(plan);
  };

  const handleContinueToPayment = () => {
    if (isInstallment && !selectedPlanId) {
      Swal.fire({
        icon: 'warning',
        title: 'Select a Plan',
        text: 'Please select an installment plan to continue.',
        confirmButtonColor: '#ff6b35',
      });
      return;
    }

    // UI-only build: no payment is processed; go straight to the confirmation screen
    navigate(`/booking-confirmation/${bookingId}`, {
      state: {
        bookingId,
        amount: totalAmount,
        reference: `REF-${Date.now()}`,
        centreDetails,
        packageDetails,
        booking: { ...bookingData, id: bookingId },
      },
    });
  };
  // Amount due today
  const amountDueToday = isInstallment && selectedPlan
    ? selectedPlan.installmentAmount
    : totalAmount;


  return (
    <div className="payment-page-wrapper">

      <div className="back-btn-container">
        <button className="back-nav-btn" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="payment-page-header">
        <h1 className="main-title">Payment</h1>
        <p className="main-subtitle">
          {isInstallment
            ? 'Choose your payment plan and complete your booking'
            : 'Complete your payment to confirm your booking'
          }
        </p>
      </div>

      {/* Installment Banner */}
      {isInstallment && (
        <div className="installment-banner-container">
          <div className="installment-banner-card">
            <div className="banner-icon-box">
              <CiCalendar size={28} />
            </div>
            <h2 className="banner-title">Installment Payment</h2>
            <p className="banner-subtitle">Split payment into smaller amounts</p>
            <span className="banner-badge">Flexible Plan Available</span>
            <span className="banner-badge">
              {installmentsPaid} of {totalInstallments} paid
            </span>
          </div>
        </div>
      )}

      <div className="payment-layout-container">

        {/* Plan Selector — installment only */}
        {isInstallment && (
          <div className="plan-selector-card">
            <h3 className="card-section-heading">Choose Installment Plan</h3>

            <div className="plans-list-wrapper">
              {plans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`plan-option-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => handlePlanSelect(plan.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="plan-left-meta">
                      <span className="plan-duration-title">{plan.totalInstallments} Installments</span>
                      <span className="plan-interval-subtitle">
                        {plan.installmentsPaid} of {plan.totalInstallments} paid
                      </span>
                    </div>
                    <div className="plan-right-price">
                      <span className="plan-price-value">{formatNaira(plan.installmentAmount)}</span>
                      <span className="plan-price-label">Per installment</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="plan-info-alert-box">
              <div className="info-alert-header">
                <LuShield className="info-alert-icon" />
                <span className="info-alert-title">Installment plan detail</span>
              </div>
              <p className="info-alert-text">
                {installmentsPaid === 0
                  ? 'First installment due today. The remaining installment will be paid separately.'
                  : `You have paid ${installmentsPaid} of ${totalInstallments} installments. Next payment due now.`
                }
              </p>
            </div>
          </div>
        )}

        {/* Booking Summary Card */}
        <div className="booking-summary-card">
          <h3 className="summary-card-title">Booking Summary</h3>

          {/* Centre & Package Info */}
          {(centreDetails?.centreName || centreDetails?.name) && (
            <div style={{ marginBottom: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>
                {centreDetails.centreName || centreDetails.name}
              </p>
              {(centreDetails.city || centreDetails.state) && (
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {centreDetails.city}, {centreDetails.state}
                </p>
              )}
              {(packageDetails?.packageName || packageDetails?.name) && (
                <p style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
                  Package: {packageDetails.packageName || packageDetails.name}
                </p>
              )}
            </div>
          )}

          {/* Ticket breakdown */}
          {bookingData.ticketDetails && bookingData.ticketDetails.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              {bookingData.ticketDetails.map((ticket, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span className="summary-row-label">
                    {ticket.ticketLabel || ticket.ticketType} x {ticket.quantity}
                  </span>
                  <span className="summary-row-val">
                    {formatNaira(ticket.price * ticket.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="summary-breakdown-table">
            <div className="summary-data-row">
              <span className="summary-row-label">Subtotal</span>
              <span className="summary-row-val">{formatNaira(subtotal)}</span>
            </div>
            <div className="summary-data-row">
              <span className="summary-row-label">Service fee</span>
              <span className="summary-row-val">{formatNaira(serviceFee)}</span>
            </div>
          </div>

          <div className="summary-highlight-toast">
            <div className="toast-row-line">
              <span className="toast-label-txt">Total</span>
              <span className="toast-val-price">{formatNaira(totalAmount)}</span>
            </div>
            {isInstallment && selectedPlan && (
              <p className="toast-sub-caption">
                Due today — installment {installmentsPaid + 1} of {totalInstallments}
              </p>
            )}
          </div>

          <div className="due-date-row-block">
            <span className="due-main-heading">Due Today</span>
            <span className="due-main-amount">{formatNaira(amountDueToday)}</span>
          </div>

          <button
            className="checkout-submit-btn"
            onClick={handleContinueToPayment}
            disabled={isInstallment && !selectedPlanId}
          >
            {isInstallment ? 'Continue To Payment' : 'Pay Now'}
          </button>


          <div className="security-notice-row">
            <LuShield className="security-shield-icon" />
            <span className="security-notice-txt">Your payment is encrypted and secure.</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentCheckout;
