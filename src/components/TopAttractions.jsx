// File: src/components/TopAttractions.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { FiTrendingUp } from "react-icons/fi";
import "../components/css/TopAttractions.css";

// ── Static sample data (UI-only build) ──
const CENTRES = [
  {
    id: "static-1",
    centreName: "Lekki Conservation Centre",
    city: "Lagos",
    imagesPublicUrl: ["/novaxcape/lekki.png"],
    trending: true,
    rating: 5.0,
    reviews: 567,
  },
  {
    id: "static-2",
    centreName: "Yankari National Park",
    city: "Bauchi",
    imagesPublicUrl: ["/novaxcape/yankari.png"],
    trending: true,
    rating: 4.0,
    reviews: 213,
  },
  {
    id: "static-3",
    centreName: "Olumo Rock",
    city: "Abeokuta",
    imagesPublicUrl: ["/novaxcape/olumo.png"],
    trending: false,
    rating: 5.0,
    reviews: 400,
  },
  {
    id: "static-4",
    centreName: "Obudu Mountain Resort",
    city: "Cross River",
    imagesPublicUrl: ["/novaxcape/obudu.png"],
    trending: true,
    rating: 4.5,
    reviews: 200,
  },
  {
    id: "static-5",
    centreName: "Green Legacy Resort",
    city: "Abeokuta",
    imagesPublicUrl: ["/novaxcape/greenLegacy.png"],
    trending: false,
    rating: 4.0,
    reviews: 122,
  },
  {
    id: "static-6",
    centreName: "Omu Resort",
    city: "Lagos",
    imagesPublicUrl: ["/novaxcape/omu.png"],
    trending: true,
    rating: 5.0,
    reviews: 567,
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <>
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} className="star star--full" />
      ))}
      {hasHalf && <FaStarHalfAlt className="star star--half" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="star star--empty" />
      ))}
    </>
  );
};

export default function TopAttractions() {
  const navigate = useNavigate();
  const allCentres = CENTRES;
  const handleCardClick = (centre) => {
    navigate(`/centre/${centre.id || centre._id}`, { state: { centre } });
  };


  return (
    <section className="top-attractions">
      <div className="section-header">
        <div className="header-title-row">
          <IoIosTrendingUp className="header-arrow" />
          <h2 className="header-title">Top Attractions</h2>
        </div>
      </div>
      <p className="header-subtitle">
        Most visited and highly rated tourism centres this month
      </p>

      {/* Cards */}
      <div className="attractions-grid">
        {allCentres.map((centre, index) => {
          const { rating, reviews, trending } = centre;
          // Get image URL
          const imageUrl =
            centre.imagesPublicUrl?.[0] ||
            centre.images?.[0]?.secureUrl ||
            centre.image ||
            "/novaxcape/placeholder.png";

          return (
            <div
              key={centre.id || centre._id || index}
              className="attraction-card"
              onClick={() => handleCardClick(centre)}
            >
              <div className="card-image-wrapper">
                <img
                  src={imageUrl}
                  alt={centre.centreName || centre.name || "Attraction"}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = "/novaxcape/placeholder.png";
                  }}
                />
                {trending && (
                  <span className="trending-badge">
                    <FiTrendingUp className="badge-icon" /> Trending
                  </span>
                )}
              </div>
              <div className="card-info">
                <p className="card-name">{centre.centreName || centre.name}</p>
                <p className="card-city">{centre.city || centre.state || "Location"}</p>
                <div className="card-rating">
                  <StarRating rating={rating} />
                  <span className="rating-number">{typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
                  <span className="review-count">({reviews || 0})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
