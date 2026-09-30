// Wallet.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import "./css/Wallet.css";

// UI-only build: static sample wallet (no API calls); withdrawals only update local state
const SAMPLE_TRANSACTIONS = [
  { id: "tx-1", title: "Withdrawal to GTBank", bankName: "GTBank", amount: 50000, status: "Completed", createdAt: "2026-09-25" },
  { id: "tx-2", title: "Ticket sales payout", amount: 185000, status: "Completed", createdAt: "2026-09-20" },
  { id: "tx-3", title: "Withdrawal to Access Bank", bankName: "Access Bank", amount: 30000, status: "Pending", createdAt: "2026-09-15" },
];
const SAMPLE_TOTAL_EARNINGS = 850000;
const SAMPLE_BALANCE = 620000;

const showSuccessAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonColor: "#ff6b35",
    timer: 3000,
    timerProgressBar: true,
  });
};

const showWarningAlert = (title, text) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    confirmButtonColor: "#ff6b35",
  });
};
const Wallet = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(SAMPLE_BALANCE);
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS);
  const totalEarnings = SAMPLE_TOTAL_EARNINGS;

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);

    if (!amount || amount <= 0) {
      showWarningAlert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    if (amount > balance) {
      showWarningAlert("Insufficient Balance", "You don't have enough balance to withdraw this amount.");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Confirm Withdrawal",
      html: `
        <p>You are about to withdraw:</p>
        <p style="font-size: 24px; font-weight: bold; color: #ff6b35;">
          ${formatCurrency(amount)}
        </p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">
          Available balance: ${formatCurrency(balance)}
        </p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Withdraw",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    // UI-only build: nothing is sent anywhere
    showSuccessAlert(
      "✅ Withdrawal Initiated!",
      "Your withdrawal has been initiated successfully."
    );
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        title: "Withdrawal request",
        bankName: "Your bank",
        amount,
        status: "Pending",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setWithdrawAmount("");
  };
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Stats cards data from API
  const statsCards = [
    {
      label: "Total Earnings",
      icon: "/novaxcape/dollar.png",
      value: formatCurrency(totalEarnings || 0),
      badge: "↑ 2.0%",
      isNaira: true,
    },
    {
      label: "Available Balance",
      icon: "/novaxcape/dollar.png",
      value: formatCurrency(balance || 0),
      badge: "↑ 2.0%",
      isNaira: true,
    },
    {
      label: "Withdrawn",
      icon: "/novaxcape/dollar.png",
      value: formatCurrency((totalEarnings || 0) - (balance || 0)),
      badge: "↑ 2.0%",
      isNaira: true,
    },
  ];


  const formatTransactionDate = (dateValue) => {
    if (!dateValue) return "Date unavailable";

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getTransactionTitle = (transaction) =>
    transaction.title ||
    transaction.description ||
    transaction.narration ||
    transaction.type ||
    transaction.transactionType ||
    transaction.purpose ||
    (transaction.bankName ? `Withdrawal to ${transaction.bankName}` : "") ||
    "Wallet transaction";

  const getTransactionAmount = (transaction) =>
    transaction.amount ||
    transaction.value ||
    transaction.total ||
    transaction.payoutAmount ||
    0;

  const getTransactionStatus = (transaction) =>
    transaction.status || transaction.paymentStatus || "Completed";

  const isWithdrawalTransaction = (transaction) =>
    Boolean(
      transaction.bankName ||
        transaction.bankCode ||
        transaction.providerReference ||
        transaction.walletId,
    );


  return (
    <div className="wallet-page">
      <div className="wallet-stats-grid">
        {statsCards.map((card, index) => (
          <div className="wallet-stat-card" key={index}>
            <div className="wallet-stat-card__header">
              <span className="wallet-stat-card__label">{card.label}</span>
              <img
                src={card.icon}
                alt={card.label}
                className="wallet-stat-card__icon"
              />
            </div>
            <div className="wallet-stat-card__value-row">
              <span className="wallet-stat-card__value">{card.value}</span>
              <span className="wallet-stat-card__badge">{card.badge}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="wallet-withdraw-row">
        <div className="wallet-withdraw-input">
          <input
            type="number"
            placeholder="Enter amount to withdraw"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="wallet-withdraw-field"
            min="0"
            step="100"
          />
          <button
            className="wallet-withdraw-btn"
            onClick={handleWithdraw}
            disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="wallet-transactions-panel">
        <h3 className="wallet-transactions-title">Transaction History</h3>
        <div className="wallet-transactions">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                className="wallet-tx-card"
                key={transaction.id || transaction._id || index}
              >
                <div className="wallet-tx-card__left">
                  <div className="wallet-tx-card__icon-wrap">
                    <span className="wallet-tx-card__dollar-icon">₦</span>
                  </div>
                  <div className="wallet-tx-card__info">
                    <p className="wallet-tx-card__title">
                      {getTransactionTitle(transaction)}
                    </p>
                    <p className="wallet-tx-card__date">
                      {formatTransactionDate(
                        transaction.createdAt ||
                          transaction.date ||
                          transaction.updatedAt ||
                          transaction.timestamp,
                      )}
                    </p>
                  </div>
                </div>
                <div className="wallet-tx-card__right">
                  <p
                    className="wallet-tx-card__amount"
                    style={{
                      color: isWithdrawalTransaction(transaction)
                        ? "#dc3545"
                        : "#28a745",
                    }}
                  >
                    {isWithdrawalTransaction(transaction)
                      ? "-"
                      : getTransactionAmount(transaction) > 0
                      ? "+"
                      : ""}
                    {formatCurrency(getTransactionAmount(transaction))}
                  </p>
                  <span
                    className={`wallet-tx-card__status ${
                      getTransactionStatus(transaction).toLowerCase() === "completed" ||
                      getTransactionStatus(transaction).toLowerCase() === "success" ||
                      getTransactionStatus(transaction).toLowerCase() === "successful"
                        ? "status-completed"
                        : getTransactionStatus(transaction).toLowerCase() === "pending" ||
                          getTransactionStatus(transaction).toLowerCase() === "processing"
                        ? "status-pending"
                        : "status-failed"
                    }`}
                  >
                    {getTransactionStatus(transaction)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <p style={{ color: "#666", fontSize: "16px" }}>
                No transactions yet
              </p>
              <p style={{ color: "#999", fontSize: "14px" }}>
                Your transaction history will appear here once you start earning.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
