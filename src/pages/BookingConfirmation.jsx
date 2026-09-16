import React from 'react';
import './styles/BookingConfirmation.css';

export default function BookingConfirmation() {
  return (
    <div className="confirm-page-wrapper">
      <div className="confirm-card">
        
        {/* Header Section */}
        <div className="confirm-header">
          <div className="confirm-icon-circle">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1>Booking Confirmed!</h1>
          <p>Your booking has been successfully confirmed.</p>
        </div>

        {/* Email Notification Banner */}
        <div className="confirm-email-banner">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <span>Your digital ticket has been sent to your email.</span>
        </div>

        {/* Booking Details Section */}
        <div className="confirm-details-section">
          <h3>Booking Details</h3>
          
          <div className="confirm-detail-item">
            <div className="confirm-detail-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="confirm-detail-text">
              <span className="confirm-label">Location</span>
              <span className="confirm-value">Lekki Conservation Centre</span>
            </div>
          </div>

          <div className="confirm-detail-item">
            <div className="confirm-detail-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="confirm-detail-text">
              <span className="confirm-label">Visit Date</span>
              <span className="confirm-value">May 15, 2026 at 10 AM</span>
            </div>
          </div>

          <div className="confirm-detail-item">
            <div className="confirm-detail-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="confirm-detail-text">
              <span className="confirm-label">Booking ID</span>
              <span className="confirm-value">Nov-2026-05-001234</span>
            </div>
          </div>
        </div>

        {/* Passcode Box Section */}
        <div className="confirm-passcode-box">
          <div className="confirm-passcode-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--confirm-primary-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
            </svg>
            <span>Gate verification Passcode</span>
          </div>
          <p className="confirm-passcode-sub">Show this code at the gate for entry verification</p>
          
          <div className="confirm-code-display">
            7 3 0 5 9 7
          </div>

          <button className="confirm-download-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Passcode
          </button>
        </div>

        {/* Bottom Action */}
        <button className="confirm-home-btn">Back to Homepage</button>

      </div>
    </div>
  );
}