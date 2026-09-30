import { useState } from "react";
import StatusBadge from "./StatusBadge";

// UI-only build: static sample data (no API calls)
const SAMPLE_BOOKINGS = [
  { id: "TKT-1001", ticketType: "Adult Ticket", date: "12 Oct 2026", totalAmount: 5000, status: "Confirmed" },
  { id: "TKT-1002", ticketType: "Family Pack", date: "12 Oct 2026", totalAmount: 7500, status: "Pending" },
  { id: "TKT-1003", ticketType: "Children Ticket", date: "13 Oct 2026", totalAmount: 1500, status: "Confirmed" },
  { id: "TKT-1004", ticketType: "Adult Ticket", date: "14 Oct 2026", totalAmount: 2500, status: "Cancelled" },
  { id: "TKT-1005", ticketType: "Family Pack", date: "15 Oct 2026", totalAmount: 7500, status: "Confirmed" },
];

const RecentBookings = ({
  title = "Recent Booking",
  viewAllText = "View all",
  onViewAll = () => {},
  bookings = SAMPLE_BOOKINGS,
}) => {
  const [checkedRows, setCheckedRows] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  const toggleRow = (index) => {
    setCheckedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    const all = {};
    bookings.forEach((_, i) => (all[i] = next));
    setCheckedRows(all);
  };

  return (
    <div className="single-booking-container">
      <div className="booking-top-header">
        <h3>{title}</h3>
        <button className="view-all-link" onClick={onViewAll}>
          {viewAllText}
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  className="orange-checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  disabled={bookings.length === 0}
                />
              </th>
              <th>Ticket ID</th>
              <th>Ticket Type</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
                  No bookings available
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={booking.id || index}>
                  <td className="checkbox-col">
                    <input
                      type="checkbox"
                      className="orange-checkbox"
                      checked={!!checkedRows[index]}
                      onChange={() => toggleRow(index)}
                    />
                  </td>
                  <td className="ticket-id">{booking.id}</td>
                  <td>{booking.ticketType}</td>
                  <td>{booking.date}</td>
                  <td>₦{Number(booking.totalAmount).toLocaleString()}</td>
                  <td>
                    <StatusBadge status={booking.status || "Pending"} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
