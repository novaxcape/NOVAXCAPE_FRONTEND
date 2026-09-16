import React, { useState } from 'react';
import './styles/Booking.css';

export default function Booking() {
  const [bookings] = useState([
    { id: 'NDV-001152', type: 'Adult ticket', date: 'May 15, 2026', amount: '₦15,500', status: 'In-Progress' },
    { id: 'NDV-001154', type: 'Children Ticket', date: 'May 20, 2026', amount: '₦11,000', status: 'Pending' },
    { id: 'NDV-001152', type: 'Family pack', date: 'May 10, 2026', amount: '₦15,500', status: 'Successful' },
    { id: 'NDV-001154', type: 'Adult Ticket', date: 'April 28, 2026', amount: '₦3,000', status: 'Canceled' },
    { id: 'NDV-001152', type: 'Adult ticket', date: 'May 04, 2026', amount: '₦4,500', status: 'Successful' },
    { id: 'NDV-001154', type: 'Children Ticket', date: 'Mar 28, 2026', amount: '₦7,000', status: 'Successful' },
    { id: 'NDV-001152', type: 'Family Pack', date: 'May 30, 2026', amount: '₦15,200', status: 'Successful' },
    { id: 'NDV-001154', type: 'Family Pack', date: 'Apr 28, 2026', amount: '₦13,500', status: 'Canceled' },
  ]);

  // Helper function to format status into a CSS class
  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="booking-container">
      
      {/* Header Section */}
      <div className="booking-header">
        <div className="booking-header-title">
          <h1>Booking History</h1>
          <p>Review your past Bookings!</p>
        </div>
        <button className="booking-btn-home">Back To Home</button>
      </div>

      {/* Toolbar Section */}
      <div className="booking-toolbar">
        <div className="booking-search-container">
          <span className="booking-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input type="text" placeholder="Input here" />
        </div>
        <button className="booking-filter-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filter By
        </button>
      </div>

      {/* Table Section */}
      <div className="booking-table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Ticket ID</th>
              <th>Ticket Type</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{booking.id}</td>
                <td>{booking.type}</td>
                <td>{booking.date}</td>
                <td>{booking.amount}</td>
                <td>
                  <span className={`booking-status ${getStatusClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="booking-pagination">
        <div className="booking-pagination-info">Showing Total Page 1 of 6</div>
        <div className="booking-page-controls">
          <button className="booking-page-btn disabled">Back</button>
          <button className="booking-page-btn active">1</button>
          <button className="booking-page-btn">2</button>
          <button className="booking-page-btn">3</button>
          <span className="booking-page-dots">...</span>
          <button className="booking-page-btn">10</button>
          <button className="booking-page-btn">Next</button>
        </div>
      </div>

    </div>
  );
}