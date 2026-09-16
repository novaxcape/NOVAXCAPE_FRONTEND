import React from 'react';
import './styles/SavedAttractions.css';

const ATTRACTIONS = [
  {
    id: 1,
    name: 'Lekki Conservation Centre',
    location: 'Lagos',
    rating: 5.0,
    reviews: 537,
    hours: '6:30 AM - 5:00 PM',
    price: 2500,
    image: 'https://picsum.photos/seed/lekki-canopy/600/420',
  },
  {
    id: 2,
    name: 'Olumo Rock',
    location: 'Abeokuta',
    rating: 4.0,
    reviews: 180,
    hours: '9:00 AM - 5:00 PM',
    price: 2000,
    image: 'https://picsum.photos/seed/olumo-rock/600/420',
  },
  {
    id: 3,
    name: 'Mapo Hall',
    location: 'Ibadan',
    rating: 4.9,
    reviews: 152,
    hours: '8:30 AM - 5:00 PM',
    price: 1500,
    image: 'https://picsum.photos/seed/mapo-hall/600/420',
  },
  {
    id: 4,
    name: 'Green Legacy Resort',
    location: 'Ogun State',
    rating: 4.0,
    reviews: 464,
    hours: '8:30 AM - 10:00 PM',
    price: 1500,
    image: 'https://picsum.photos/seed/green-legacy/600/420',
  },
  {
    id: 5,
    name: 'Yankari National Park',
    location: 'Bauchi',
    rating: 5.0,
    reviews: 170,
    hours: '8:30 AM - 7:00 PM',
    price: 2000,
    image: 'https://picsum.photos/seed/yankari-falls/600/420',
  },
  {
    id: 6,
    name: 'Obudu Mountain Resort',
    location: 'Cross River',
    rating: 5.0,
    reviews: 581,
    hours: '10:30 AM - 5:00 PM',
    price: 3000,
    image: 'https://picsum.photos/seed/obudu-resort/600/420',
  },
];

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.6l-6.1 3.1 1.5-6.7-5.1-4.6 6.8-.7L12 2.5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </svg>
  );
}

export default function SavedAttractions() {
  return (
    <div className="sa-page-wrapper">
      <div className="sa-header">
        <h1>Saved Attractions ({ATTRACTIONS.length})</h1>
        <p>View and manage all your saved experience in one place.</p>
      </div>

      <div className="sa-grid">
        {ATTRACTIONS.map((spot, index) => (
          <div
            className="sa-card"
            key={spot.id}
            style={{ '--sa-delay': `${0.08 * index}s` }}
          >
            <div className="sa-card-image-wrap">
              <img src={spot.image} alt={spot.name} className="sa-card-image" loading="lazy" />
            </div>

            <div className="sa-card-body">
              <h3 className="sa-card-title">{spot.name}</h3>
              <span className="sa-card-location">{spot.location}</span>

              <div className="sa-card-meta">
                <span className="sa-rating">
                  <StarIcon />
                  {spot.rating.toFixed(1)}
                  <span className="sa-reviews">({spot.reviews})</span>
                </span>
                <span className="sa-hours">
                  <ClockIcon />
                  {spot.hours}
                </span>
              </div>

              <div className="sa-card-footer">
                <div className="sa-price">
                  <span className="sa-price-label">From</span>
                  <span className="sa-price-value">{spot.price.toLocaleString()}</span>
                </div>
                <button type="button" className="sa-book-btn">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
