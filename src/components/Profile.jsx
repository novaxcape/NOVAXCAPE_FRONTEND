// File: src/Pages/Profile.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiUpload, FiTrash2 } from 'react-icons/fi';
import { LuSave } from 'react-icons/lu';

import './css/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  
  // Tab control state
  const [activeTab, setActiveTab] = useState('account');
  
  // UI-only build: profile values are kept in local state and persisted to localStorage
  const [formData, setFormData] = useState(() => {
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem('clientProfileExtra') || '{}');
    } catch {
      saved = {};
    }
    return {
      userName: '',
      firstName: saved.firstName || 'Ada',
      lastName: saved.lastName || 'Okafor',
      nickname: saved.nickname || '',
      phoneNumber: saved.phoneNumber || '',
      gender: saved.gender || '',
      email: saved.email || 'ada@example.com',
      city: saved.city || '',
      state: saved.state || ''
    };
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/novaxcape/avatar.png');
  const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (20MB max)
      if (file.size > 20 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Please upload an image under 20MB',
          confirmButtonColor: '#ff6b35'
        });
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload PNG, JPEG, GIF, or WEBP images only',
          confirmButtonColor: '#ff6b35'
        });
        return;
      }
      
      setAvatarFile(file);
      setIsAvatarRemoved(false);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setIsAvatarRemoved(true);
    setAvatarPreview('/novaxcape/avatar.png');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName && !formData.firstName) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please provide at least a username or first name',
        confirmButtonColor: '#ff6b35'
      });
      return;
    }

    localStorage.setItem('clientProfileExtra', JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      nickname: formData.nickname,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      email: formData.email,
      city: formData.city,
      state: formData.state,
    }));

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Profile updated successfully.',
      timer: 3000,
      showConfirmButton: false
    });
  };
  const handleDeleteAccount = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone. Your account and all associated data will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete my account',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Feature Coming Soon',
          text: 'Account deletion will be available soon. Please contact support for assistance.',
          confirmButtonColor: '#ff6b35'
        });
      }
    });
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-settings-container">
        
        <header className="settings-header">
          <h1 className="settings-title">Profile Settings</h1>
          <p className="settings-subtitle">Manage your account information and preferences</p>
        </header>

        <section className="profile-photo-section">
          <div className="avatar-wrapper">
            <img 
              src={avatarPreview} 
              alt="User avatar" 
              className="avatar-image" 
              onError={(e) => { e.target.src = '/novaxcape/avatar.png'; }}
            />
          </div>
          <div className="photo-controls">
            <h2 className="profile-label">Profile</h2>
            <div className="photo-actions">
              <label className="btn-upload" style={{ cursor: 'pointer' }}>
                <FiUpload className="react-icon" />
                Upload Image
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
              </label>
              <button type="button" className="btn-remove" onClick={handleRemoveAvatar}>
                Remove
              </button>
            </div>
            <p className="photo-hint">We support PNGs, JPEGs, GIFs, and WEBP under 20MB.</p>
          </div>
        </section>

        <div className="settings-tabs-wrapper">
          <nav className="settings-tabs-nav">
            <button 
              type="button" 
              className={activeTab === 'account' ? 'tab-pill-blue' : 'tab-pill-white'}
              onClick={() => setActiveTab('account')}
            >
              Account Setting
            </button>
            <button 
              type="button" 
              className={activeTab === 'general' ? 'tab-pill-blue' : 'tab-pill-white'}
              onClick={() => setActiveTab('general')}
            >
              Setting
            </button>
          </nav>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            
            {/* ✅ userName - Required by API */}
            <div className="form-group">
              <label htmlFor="userName">Username *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="userName" 
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your username" 
                  required
                />
                <small className="field-hint">This is your display name. Required for API.</small>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="firstName" 
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name" 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="lastName" 
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name" 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nickname">Nickname</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="nickname" 
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="Your display name" 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-wrapper">
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Input phone number" 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <div className="input-wrapper select-wrapper">
                <select 
                  id="gender" 
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email" 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="city" 
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city" 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="state" 
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state" 
                />
              </div>
            </div>
            
          </div>

          <div className="form-actions-footer">
            <button type="submit" className="btn-save">
              Save Changes
              <LuSave className="react-icon" />
            </button>
            <button type="button" className="btn-delete" onClick={handleDeleteAccount}>
              Delete Account
              <FiTrash2 className="react-icon" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile;
