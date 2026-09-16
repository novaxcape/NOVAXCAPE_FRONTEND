import React, { useRef, useState } from 'react';
import './styles/ProfileSetting.css';

const DEFAULT_AVATAR = 'https://i.pravatar.cc/160?img=47';

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export default function ProfileSetting() {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [activeTab, setActiveTab] = useState('account');
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    phoneNumber: '',
    gender: '',
    email: '',
    city: '',
    state: '',
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => setAvatar(DEFAULT_AVATAR);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="ps-page-wrapper">
      <div className="ps-header">
        <h1>Profile Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      {/* Profile / Avatar */}
      <div className="ps-profile-section">
        <div className="ps-avatar-wrap">
          <img src={avatar} alt="Profile avatar" className="ps-avatar" />
        </div>
        <div className="ps-profile-info">
          <span className="ps-profile-label">Profile</span>
          <div className="ps-profile-actions">
            <button type="button" className="ps-upload-btn" onClick={handleUploadClick}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Image
            </button>
            <button type="button" className="ps-remove-btn" onClick={handleRemove}>
              Remove
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/gif"
              className="ps-file-input"
              onChange={handleFileChange}
            />
          </div>
          <span className="ps-profile-hint">We support PNGs, JPEGs and GIFs under 20MB.</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="ps-tabs" role="tablist">
        <div className={`ps-tabs-indicator ${activeTab === 'setting' ? 'ps-tabs-indicator--right' : ''}`} />
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'account'}
          className={`ps-tab ${activeTab === 'account' ? 'ps-tab--active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account Setting
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'setting'}
          className={`ps-tab ${activeTab === 'setting' ? 'ps-tab--active' : ''}`}
          onClick={() => setActiveTab('setting')}
        >
          Setting
        </button>
      </div>

      {/* Form */}
      <form className="ps-form" onSubmit={handleSave}>
        <div className="ps-form-grid">
          <div className="ps-field" style={{ '--ps-delay': '0.05s' }}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your Name"
              value={form.firstName}
              onChange={handleChange('firstName')}
            />
          </div>

          <div className="ps-field" style={{ '--ps-delay': '0.1s' }}>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your Name"
              value={form.lastName}
              onChange={handleChange('lastName')}
            />
          </div>

          <div className="ps-field" style={{ '--ps-delay': '0.15s' }}>
            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              type="text"
              placeholder="Enter_Lovely"
              value={form.nickname}
              onChange={handleChange('nickname')}
            />
          </div>

          <div className="ps-field" style={{ '--ps-delay': '0.2s' }}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="Input phone number"
              value={form.phoneNumber}
              onChange={handleChange('phoneNumber')}
            />
          </div>

          <div className="ps-field" style={{ '--ps-delay': '0.25s' }}>
            <label htmlFor="gender">Gender</label>
            <div className="ps-select-wrap">
              <select id="gender" value={form.gender} onChange={handleChange('gender')}>
                <option value="" disabled>
                  Select Option
                </option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <svg className="ps-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="ps-field" style={{ '--ps-delay': '0.3s' }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              value={form.email}
              onChange={handleChange('email')}
            />
          </div>

          <div className="ps-field" style={{ '--ps-delay': '0.35s' }}>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="Enter your City"
              value={form.city}
              onChange={handleChange('city')}
            />
          </div>

          <div className="ps-field" style={{ '--ps-delay': '0.4s' }}>
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              placeholder="Enter your State"
              value={form.state}
              onChange={handleChange('state')}
            />
          </div>
        </div>

        <div className="ps-actions">
          <button type="submit" className={`ps-save-btn ${saved ? 'ps-save-btn--saved' : ''}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {saved ? <polyline points="20 6 9 17 4 12" /> : <path d="M12 5v14M5 12h14" />}
            </svg>
            {saved ? 'Saved' : 'Save Changes'}
          </button>
          <button type="button" className="ps-delete-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}
