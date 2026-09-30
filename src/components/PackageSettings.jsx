import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Package,
  Check,
  X,
  Inbox,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

import "./css/Package.css";

// UI-only build: static sample data (no API calls); changes live in local state only
const SAMPLE_PACKAGES = [
  { id: "pkg-1", packageName: "Adult Ticket", packageType: "Adult", numberOfPeople: 1, amount: 2500, status: "active", description: "Standard adult entry" },
  { id: "pkg-2", packageName: "Children Ticket", packageType: "Child", numberOfPeople: 1, amount: 1500, status: "active", description: "Entry for ages 5-17" },
  { id: "pkg-3", packageName: "Family Pack", packageType: "Family", numberOfPeople: 4, amount: 7000, status: "active", description: "2 adults and 2 children" },
  { id: "pkg-4", packageName: "Guided Tour", packageType: "Group", numberOfPeople: 10, amount: 20000, status: "inactive", description: "Guided group experience" },
];


const PackageSettings = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [packages, setPackages] = useState(SAMPLE_PACKAGES);
  const [error, setError] = useState(null);

  // Modal display control states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Form input management state
  const [formData, setFormData] = useState({
    id: "",
    packageName: "",
    packageType: "",
    numberOfPeople: "",
    amount: "",
    status: "active",
  });


  // Handle delete click
  const handleDeleteClick = (packageId) => {
    setDeleteTargetId(packageId);
  };

  // Execute delete confirm action
  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    setPackages((prev) => prev.filter((p) => (p.id || p._id) !== deleteTargetId));
    setDeleteTargetId(null);
    setSuccessMessage("Package deleted successfully");
    setShowSuccessModal(true);
  };
  // Open Add popup
  const handleAddPackageClick = () => {
    setFormData({
      id: "",
      packageName: "",
      packageType: "",
      numberOfPeople: "",
      amount: "",
      status: "active",
    });
    setShowAddModal(true);
  };

  // Open Edit popup and populate fields
  const handleEditClick = (pkg) => {
    setFormData({
      id: pkg.id || pkg._id,
      packageName: pkg.packageName || pkg.name || "",
      packageType: pkg.packageType || pkg.type || "",
      numberOfPeople: pkg.numberOfPeople || pkg.maxPeople || "",
      amount: pkg.amount || pkg.price || "",
      status: pkg.status || "active",
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add Form Submission
  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!formData.packageName) {
      setError("Package name is required");
      return;
    }

    if (!formData.amount) {
      setError("Amount is required");
      return;
    }

    setError(null);
    setPackages((prev) => [
      ...prev,
      {
        id: `pkg-${Date.now()}`,
        packageName: formData.packageName,
        packageType: formData.packageType || "Standard",
        numberOfPeople: formData.numberOfPeople || "1",
        amount: parseFloat(formData.amount),
        status: formData.status || "active",
      },
    ]);
    setShowAddModal(false);
    setSuccessMessage("Package added successfully");
    setShowSuccessModal(true);
  };
  // Handle Edit Form Submission
  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!formData.packageName) {
      setError("Package name is required");
      return;
    }

    if (!formData.amount) {
      setError("Amount is required");
      return;
    }

    setError(null);
    setPackages((prev) =>
      prev.map((p) =>
        (p.id || p._id) === formData.id
          ? {
              ...p,
              packageName: formData.packageName,
              packageType: formData.packageType || "Standard",
              numberOfPeople: formData.numberOfPeople || "1",
              amount: parseFloat(formData.amount),
              status: formData.status || p.status,
            }
          : p,
      ),
    );
    setShowEditModal(false);
    setSuccessMessage("Package updated successfully");
    setShowSuccessModal(true);
  };
  // Handle view package details
  const handleView = (packageId) => {
    navigate(`/vendor/package/${packageId}`);
  };

  // Filter package entries matching UI criteria
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.packageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && pkg.status !== "inactive") ||
      (filterStatus === "Inactive" && pkg.status === "inactive");

    return matchesSearch && matchesStatus;
  });

  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.status !== "inactive").length;
  const inactivePackages = packages.filter(
    (p) => p.status === "inactive",
  ).length;


  return (
    <div className="package-container">
      {/* Header element */}
      <div className="package-header">
        <div>
          <h2>Package Settings</h2>
          <p>
            Manage your tour packages — view, edit, and control availability
          </p>
        </div>

        <button className="add-package-btn" onClick={handleAddPackageClick}>
          <Plus size={18} />
          Add Package
        </button>
      </div>

      {/* Search Bar & Status Filters */}
      <div className="package-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter ${filterStatus === "All" ? "active" : ""}`}
            onClick={() => setFilterStatus("All")}
          >
            All
          </button>
          <button
            className={`filter ${filterStatus === "Active" ? "active" : ""}`}
            onClick={() => setFilterStatus("Active")}
          >
            Active
          </button>
          <button
            className={`filter ${filterStatus === "Inactive" ? "active" : ""}`}
            onClick={() => setFilterStatus("Inactive")}
          >
            Inactive
          </button>
          <span className="package-count">
            {filteredPackages.length} packages
          </span>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">
            <Package size={18} />
          </div>
          <div>
            <h3>{totalPackages}</h3>
            <p>Total Packages</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">
            <Check size={18} />
          </div>
          <div>
            <h3>{activePackages}</h3>
            <p>Active</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">
            <X size={18} />
          </div>
          <div>
            <h3>{inactivePackages}</h3>
            <p>Inactive</p>
          </div>
        </div>
      </div>

      {/* Main Datatable Render */}
      {filteredPackages.length === 0 ? (
        <div className="empty-state">
          <Inbox size={35} strokeWidth={1.5} />
          <h3>No packages found</h3>
          <p>
            {searchTerm || filterStatus !== "All"
              ? "Try adjusting your search or filters"
              : "Add your first package to get started"}
          </p>
          {(searchTerm || filterStatus !== "All") && (
            <button
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("All");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="package-list">
          <table className="package-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.map((pkg) => {
                const packageName =
                  pkg.packageName || pkg.name || "Unnamed Package";
                const price = pkg.amount || pkg.price || 0;
                const packageType = pkg.packageType || pkg.type || "Standard";
                const status = pkg.status || "active";
                const createdAt = pkg.createdAt
                  ? new Date(pkg.createdAt).toLocaleDateString()
                  : "N/A";

                return (
                  <tr key={pkg.id || pkg._id}>
                    <td>
                      <div className="package-name-cell">
                        <span className="package-name">{packageName}</span>
                        {pkg.description && (
                          <span className="package-desc">
                            {pkg.description.slice(0, 50)}...
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="package-price">
                      ₦{Number(price).toLocaleString()}
                    </td>
                    <td>
                      <span className="package-type-badge">{packageType}</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          status === "inactive" ? "inactive" : "active"
                        }`}
                      >
                        {status === "inactive" ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td className="package-date">{createdAt}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view"
                          onClick={() => handleView(pkg.id || pkg._id)}
                          title="View Package"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => handleEditClick(pkg)}
                          title="Edit Package"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteClick(pkg.id || pkg._id)}
                          title="Delete Package"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* --- ADD NEW PACKAGE MODAL --- */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-area">
                <h2>Add New Package</h2>
                <p>Create a new tour package</p>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Package Name *</label>
                <input
                  type="text"
                  name="packageName"
                  className="form-input"
                  placeholder="e.g. Family Package"
                  value={formData.packageName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Package Type</label>
                <input
                  type="text"
                  name="packageType"
                  className="form-input"
                  placeholder="e.g. Premium, Standard, Economy"
                  value={formData.packageType}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Number of people</label>
                <input
                  type="text"
                  name="numberOfPeople"
                  className="form-input"
                  placeholder="e.g. 5"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                />
                <small className="form-hint">
                  Maximum number of people per booking
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">Amount (₦) *</label>
                <input
                  type="number"
                  name="amount"
                  className="form-input"
                  placeholder="e.g. 50000"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn-submit"
                >
                  <Check size={16} /> Add Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT PACKAGE MODAL --- */}
      {showEditModal && (
        <div className="modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-area">
                <h2>Edit Package</h2>
                <p>Edit tour package</p>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setShowEditModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Package Name *</label>
                <input
                  type="text"
                  name="packageName"
                  className="form-input"
                  placeholder="Package name"
                  value={formData.packageName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Package Type</label>
                <input
                  type="text"
                  name="packageType"
                  className="form-input"
                  placeholder="Package type"
                  value={formData.packageType}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Number of people</label>
                <input
                  type="text"
                  name="numberOfPeople"
                  className="form-input"
                  placeholder="Max people"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Amount (₦) *</label>
                <input
                  type="number"
                  name="amount"
                  className="form-input"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn-submit"
                >
                  <Check size={16} /> Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SUCCESS STATUS MODAL --- */}
      {showSuccessModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="alert-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="success-icon">✓</div>
            <h2 className="alert-title">Success!</h2>
            <p className="alert-message">{successMessage}</p>
            <button
              className="alert-btn-continue"
              onClick={() => setShowSuccessModal(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE MODAL --- */}
      {deleteTargetId && (
        <div className="modal-backdrop" onClick={() => setDeleteTargetId(null)}>
          <div
            className="alert-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="alert-title">Delete Package</h2>
            <p className="alert-message">
              Are you sure you want to delete this package? This action cannot
              be undone.
            </p>
            <div className="alert-actions-row">
              <button
                className="alert-btn-cancel"
                onClick={() => setDeleteTargetId(null)}
              >
                Cancel
              </button>
              <button
                className="alert-btn-delete"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageSettings;
