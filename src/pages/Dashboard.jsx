// Dashboard.jsx
import { useOutletContext } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import WelcomeSection from "../components/WelcomeSection";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import TicketDonutChart from "../components/TicketDonutChart";
import RecentBookings from "../components/RecentBookings";
import PerformanceInsight from "../components/PerformanceInsight";
import CapacityGoals from "../components/CapacityGoals";

import "../Styles/Dashboard.css";

// UI-only build: static sample data (no API calls)
const SAMPLE_STATS = {
  vendorName: "Lekki Conservation Centre",
  requests: { today: 42, yesterday: 35 },
  revenue: { today: 185000, yesterday: 160000 },
  bookings: { today: 38, yesterday: 30, total: 1200 },
  ratings: { average: 4.8, count: 567 },
  ticketTypes: {
    total: 88,
    breakdown: [
      { name: "Family Pack", value: 22, color: "#f4622a" },
      { name: "Children Ticket", value: 25, color: "#0d2d6e" },
      { name: "Adult Ticket", value: 35, color: "#a8d4e8" },
      { name: "Total package", value: 8, color: "#1e1008" },
    ],
  },
  visitorStats: [
    { date: "Mon", visits: 32000 },
    { date: "Tue", visits: 41000 },
    { date: "Wed", visits: 38000 },
    { date: "Thu", visits: 52000 },
    { date: "Fri", visits: 61000 },
    { date: "Sat", visits: 87000 },
    { date: "Sun", visits: 74000 },
  ],
};

const Dashboard = () => {
  const { openMobileMenu = () => {} } = useOutletContext() || {};

  const { vendorName, requests, revenue, bookings, ratings, ticketTypes, visitorStats } =
    SAMPLE_STATS;

  return (
    <>
      <div className="sticky-wrapper">
        <TopNavbar onMenuOpen={openMobileMenu} />
      </div>

      <WelcomeSection />

      <div className="dashboard-stats-grid">
        <StatCard
          title="Total Tickets Today"
          value={requests?.today || 0}
          percent={calculatePercentage(requests?.today, requests?.yesterday)}
          previous={`Yesterday: ${requests?.yesterday || 0}`}
          type="ticket"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(revenue?.today || 0)}
          percent={calculatePercentage(revenue?.today, revenue?.yesterday)}
          previous={`Yesterday: ${formatCurrency(revenue?.yesterday || 0)}`}
          type="revenue"
        />
        <StatCard
          title="Total Bookings"
          value={bookings?.today || 0}
          percent={calculatePercentage(bookings?.today, bookings?.yesterday)}
          previous={`Yesterday: ${bookings?.yesterday || 0}`}
          type="booking"
        />
        <StatCard
          title="Average Rating"
          value={ratings?.average || 0}
          percent={`${ratings?.count || 0} reviews`}
          previous={`Total reviews: ${ratings?.count || 0}`}
          type="rating"
        />
      </div>

      <div className="chart-section">
        <RevenueChart
          data={
            visitorStats?.map((item) => ({
              day: item.date,
              revenue: item.visits,
            })) || []
          }
          title="Visitor Revenue Trend"
          subtitle={`For ${visitorStats?.length || 0} days`}
        />
        <TicketDonutChart
          data={ticketTypes?.breakdown || []}
          total={ticketTypes?.total || 0}
        />
      </div>

      <RecentBookings />

      <div className="bottom-section">
        {/* <PerformanceInsight
          data={{
            revenue: revenue,
            bookings: bookings,
            ratings: ratings,
          }}
        /> */}
        <CapacityGoals
          centreName={vendorName || "Lekki Conservation"}
          capacity={bookings?.total || 1200}
          filled={bookings?.today || 0}
          percentage={
            bookings?.total > 0
              ? Math.round((bookings.today / bookings.total) * 100)
              : 0
          }
        />
      </div>
    </>
  );
};

const calculatePercentage = (current, previous) => {
  if (!previous || previous === 0) return "0%";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default Dashboard;
