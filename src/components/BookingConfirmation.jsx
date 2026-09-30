import React, { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { HiOutlineMail } from "react-icons/hi";
import { FiMapPin, FiCalendar, FiShield, FiDownload } from "react-icons/fi";
import { RiIdCardLine } from "react-icons/ri";

import "./css/BookingConfirmation.css";

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // UI-only build: the confirmation is built from the booking state passed in
  // navigation state by the payment step (no payment verification request).
  const locationBookingData = useMemo(() => location.state || {}, [location.state]);

  const [bookingDetails] = useState(() => {
    const data = location.state || {};
    const centre = data.centreDetails || {};
    const isInstallment = Boolean(data.booking?.isInstallment);
    const totalAmount = Number(data.amount || 0);
    const totalInstallments = isInstallment ? 2 : 0;

    return {
      location:
        [centre.centreName, centre.city].filter(Boolean).join(", ") ||
        "Lekki Conservation Centre, Lagos",
      visitDate: data.booking?.date || "",
      bookingId: bookingId || data.bookingId || "",
      passcode: String(Math.floor(100000 + Math.random() * 900000)),
      amount: totalAmount,
      status: "confirmed",
      reference: data.reference || "",
      isInstallment,
      installmentsPaid: isInstallment ? 1 : 0,
      totalInstallments,
      amountPerInstallment: isInstallment ? Math.ceil(totalAmount / 2) : 0,
      totalAmount,
    };
  });

  // 'success' | 'partial-success' — installment bookings show the partial state
  const verificationStatus = bookingDetails.isInstallment ? "partial-success" : "success";
  const errorMessage = "";
  // Utility: Format Date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Fallback if invalid date

      return `${date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })} at ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`;
    } catch {
      return dateString;
    }
  };


  // Handlers
  const handleDownloadPasscode = () => {
    const passcode = bookingDetails.passcode || 'N/A';
    const passcodeText = `Booking Confirmation\n\nBooking ID: ${bookingDetails.bookingId}\nPasscode: ${passcode}\nLocation: ${bookingDetails.location}\nVisit Date: ${formatDate(bookingDetails.visitDate)}\nAmount Paid: ₦${Number(bookingDetails.amount).toLocaleString()}`;

    const blob = new Blob([passcodeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `passcode-${bookingDetails.bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'Passcode Downloaded!',
      text: 'Your passcode has been downloaded successfully.',
      confirmButtonColor: '#ff6b35',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleCopyPasscode = () => {
    if (!bookingDetails.passcode) return;
    navigator.clipboard.writeText(bookingDetails.passcode);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Passcode copied to clipboard.',
      confirmButtonColor: '#ff6b35',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleRetryPayment = () => {
    navigate(`/payment-checkout/${bookingId}`, {
      state: {
        bookingId: bookingId,
        amount: bookingDetails.amount,
        totalAmount: bookingDetails.totalAmount || bookingDetails.amount,
        bookingData: locationBookingData,
        reference: bookingDetails.reference,
        isInstallment: bookingDetails.isInstallment || false,
        centreDetails: locationBookingData.centreDetails,
        packageDetails: locationBookingData.packageDetails,
      },
    });
  };

  // For partial-success: navigate to pay the next installment specifically
  const handlePayNextInstallment = () => {
    navigate(`/payment-checkout/${bookingId}`, {
      state: {
        bookingId: bookingId,
        amount: bookingDetails.totalAmount || bookingDetails.amount,
        totalAmount: bookingDetails.totalAmount || bookingDetails.amount,
        subtotal: locationBookingData.subtotal,
        serviceFee: locationBookingData.serviceFee,
        bookingData: locationBookingData,
        reference: bookingDetails.reference,
        isInstallment: true,
        centreDetails: locationBookingData.centreDetails,
        packageDetails: locationBookingData.packageDetails,
        ticketDetails: locationBookingData.ticketDetails,
      },
    });
  };

  // UI Renders based on verification status

  if (verificationStatus === 'failed') {
    return (
      <div className="confirmation-page-wrapper">
        <div className="confirmation-card">
          <div className="failed-state">
            <div className="failed-icon">❌</div>
            <h2 className="confirmation-title">Verification Failed</h2>
            <p className="confirmation-subtitle">{errorMessage || "We couldn't verify your payment."}</p>
            <button className="homepage-redirect-btn" onClick={handleRetryPayment}>
              Retry Payment
            </button>
            <button className="homepage-redirect-btn" onClick={handleBackToHome} style={{ marginTop: '12px', background: '#e2e8f0', color: '#334155' }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'pending') {
    return (
      <div className="confirmation-page-wrapper">
        <div className="confirmation-card">
          <div className="pending-state">
            <div className="pending-icon">⏳</div>
            <h2 className="confirmation-title">Payment Pending</h2>
            <p className="confirmation-subtitle">Your booking is awaiting payment confirmation.</p>
            {bookingDetails.bookingId && (
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
                Booking ID: <strong>{bookingDetails.bookingId}</strong>
              </p>
            )}
            <button className="homepage-redirect-btn" onClick={handleRetryPayment}>
              Complete Payment
            </button>
            <button className="homepage-redirect-btn" onClick={handleBackToHome} style={{ marginTop: '12px', background: '#e2e8f0', color: '#334155' }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'partial-success') {
    const remaining = bookingDetails.totalInstallments - bookingDetails.installmentsPaid;
    return (
      <div className="confirmation-page-wrapper">
        <div className="confirmation-card">
          <div className="pending-state">
            <div className="pending-icon">✅</div>
            <h2 className="confirmation-title">
              Installment {bookingDetails.installmentsPaid} of {bookingDetails.totalInstallments} Paid
            </h2>
            <p className="confirmation-subtitle">
              You've paid ₦{Number(bookingDetails.amountPerInstallment).toLocaleString()} toward a total of ₦{Number(bookingDetails.totalAmount).toLocaleString()}.
              {remaining > 0 && ` ${remaining} installment${remaining > 1 ? 's' : ''} remaining.`}
            </p>
            {bookingDetails.bookingId && (
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
                Booking ID: <strong>{bookingDetails.bookingId}</strong>
              </p>
            )}
            <button className="homepage-redirect-btn" onClick={handlePayNextInstallment}>
              Pay Next Installment
            </button>
            <button className="homepage-redirect-btn" onClick={handleBackToHome} style={{ marginTop: '12px', background: '#e2e8f0', color: '#334155' }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // verificationStatus === 'success'
  const displayPasscode = bookingDetails.passcode || '••••••';

  return (
    <div className="confirmation-page-wrapper">
      <div className="confirmation-card">
        <div className="success-badge-container">
          <img src="/novaxcape/check.png" alt="Booking Confirmed" className="success-checkmark-img" />
        </div>

        <h1 className="confirmation-title">Booking Confirmed!</h1>
        <p className="confirmation-subtitle">Your booking has been successfully confirmed.</p>

        <div className="email-toast-message">
          <div className="email-left-content">
            <HiOutlineMail className="email-toast-icon" />
            <span className="email-toast-text">Your digital ticket has been sent to your email.</span>
          </div>
        </div>

        <div className="booking-details-box">
          <h3 className="details-section-title">Booking Details</h3>

          <div className="detail-item-row">
            <FiMapPin className="detail-meta-icon" />
            <div className="detail-text-cell">
              <span className="detail-field-label">Location</span>
              <span className="detail-field-value">{bookingDetails.location || 'Not specified'}</span>
            </div>
          </div>

          <div className="detail-item-row">
            <FiCalendar className="detail-meta-icon" />
            <div className="detail-text-cell">
              <span className="detail-field-label">Visit Date</span>
              <span className="detail-field-value">{formatDate(bookingDetails.visitDate)}</span>
            </div>
          </div>

          <div className="detail-item-row">
            <RiIdCardLine className="detail-meta-icon" />
            <div className="detail-text-cell">
              <span className="detail-field-label">Booking ID</span>
              <span className="detail-field-value">{bookingDetails.bookingId || 'N/A'}</span>
            </div>
          </div>

          {bookingDetails.amount > 0 && (
            <div className="detail-item-row">
              <span className="detail-meta-icon">₦</span>
              <div className="detail-text-cell">
                <span className="detail-field-label">Amount Paid</span>
                <span className="detail-field-value">₦{Number(bookingDetails.amount).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="passcode-container-card">
          <div className="passcode-header-row">
            <FiShield className="passcode-shield-icon" />
            <h4 className="passcode-main-heading">Gate Verification Passcode</h4>
          </div>
          <p className="passcode-sub-caption">Tap to copy · show this code at the gate for entry</p>

          <div className="passcode-display-block" onClick={handleCopyPasscode} style={{ cursor: 'pointer' }} title="Tap to copy">
            {displayPasscode.split('').map((digit, index) => (
              <span key={index} className="passcode-digit">{digit}</span>
            ))}
          </div>

          <button className="download-passcode-action-btn" onClick={handleDownloadPasscode}>
            <FiDownload className="download-action-icon" />
            Download Ticket Details
          </button>
        </div>

        <div className="navigation-footer-action">
          <button className="homepage-redirect-btn" onClick={handleBackToHome}>
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
