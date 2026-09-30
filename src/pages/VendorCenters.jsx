// Pages/VendorCenters.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Styles/VendorCenters.css';

// UI-only build: static sample data (no API calls)
const SAMPLE_CENTERS = [
  {
    id: 'sample-1',
    centreName: 'Lekki Conservation Centre',
    city: 'Lagos',
    description: 'A nature reserve with the longest canopy walkway in Africa.',
    openingHours: '8:30 AM - 5:00 PM',
    dailySlotCapacity: 1200,
    installmentPayment: true,
    imagesPublicUrl: ['/novaxcape/lekki.png'],
  },
  {
    id: 'sample-2',
    centreName: 'Olumo Rock',
    city: 'Abeokuta',
    description: 'A historic rock formation with caves, shrines and panoramic views.',
    openingHours: '9:00 AM - 6:00 PM',
    dailySlotCapacity: 800,
    installmentPayment: false,
    imagesPublicUrl: ['/novaxcape/olumo.png'],
  },
];

const VendorCenters = () => {
  const navigate = useNavigate();
  const [centers, setCenters] = useState(SAMPLE_CENTERS);

  const handleDeleteCenter = async (centerId, centerName) => {
    const result = await Swal.fire({
      title: 'Delete Center?',
      text: `Are you sure you want to delete "${centerName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      setCenters((prev) => prev.filter((c) => (c.id || c._id) !== centerId));
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Center has been deleted successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleRefresh = () => {
    setCenters(SAMPLE_CENTERS);
  };
  const handleSelectCentre = (center) => {
    const id = center.id || center._id;
    localStorage.setItem("selectedCentreId", id);
    localStorage.setItem("selectedCentreName", center.centreName || center.name || "");
    
    navigate("/vendor/dashboard", { 
      state: { 
        selectedCentre: center,
        centreId: id 
      } 
    });
  };


  return (
    <div className="vendor-centers-container">
      <div className="centers-header">
        <div>
          <h1>My Tourist Centers</h1>
          {centers.length > 0 && (
            <p className="vendor-info">
              Showing {centers.length} center{centers.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="header-actions">
          <button 
            className="refresh-btn" 
            onClick={handleRefresh}
          >
            🔄 Refresh
          </button>
          <button 
            className="create-center-btn"
            onClick={() => navigate('/add-centre')}
          >
            + Create New Center
          </button>
        </div>
      </div>

      {centers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <h3>No Centers Created Yet</h3>
          <p>Start by creating your first tourist center.</p>
          <button 
            className="create-center-btn"
            onClick={() => navigate('/add-centre')}
          >
            Create Your First Center
          </button>
        </div>
      ) : (
        <div className="centers-grid">
          {centers.map((center) => {
            const id = center.id || center._id;
            const name = center.centreName || center.name || "Unnamed Centre";
            const location = center.city || center.state || center.location || "";
            const imageUrl = center.images?.[0]?.secureUrl || center.imagesPublicUrl?.[0] || null;
            
            return (
              <div key={id} className="center-card">
                <div className="center-image">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={name}
                      onError={(e) => {
                        e.target.src = '/novaxcape/default-center.jpg';
                      }}
                    />
                  ) : (
                    <div className="no-image">📷 No Image</div>
                  )}
                </div>

                <div className="center-details">
                  <h3>{name}</h3>
                  {location && (
                    <p className="center-location">📍 {location}</p>
                  )}
                  <p className="center-description">
                    {center.description || 'No description available'}
                  </p>
                  
                  <div className="center-info">
                    {center.openingHours && (
                      <span className="info-item">🕐 {center.openingHours}</span>
                    )}
                    {center.dailySlotCapacity && (
                      <span className="info-item">👥 Capacity: {center.dailySlotCapacity}</span>
                    )}
                    {center.installmentPayment && (
                      <span className="info-item badge">💰 Installment Available</span>
                    )}
                  </div>

                  <div className="center-actions">
                    <button 
                      className="view-btn"
                      onClick={() => handleSelectCentre(center)}
                    >
                      Manage Centre
                    </button>
                    <button 
                      className="edit-btn"
                      onClick={() => navigate(`/vendor/edit-center/${id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteCenter(id, name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VendorCenters;