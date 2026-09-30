// Discoversection.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegClock } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import "./css/Discoversection.css";

// Static images (fallback)
import lekki from "/novaxcape/lekki.png";
import olumo from "/novaxcape/olumo.png";
import mapo from "/novaxcape/mapo.png";
import greenLegacy from "/novaxcape/greenLegacy.png";
import yankari from "/novaxcape/yankari.png";
import obudu from "/novaxcape/obudu.png";
import millennium from "/novaxcape/millennium.png";
import nikeGallery from "/novaxcape/nikeGallery.png";
import agodi from "/novaxcape/agodi.png";

const categories = [
  "All",
  "Park & Recreation",
  "Art Gallery",
  "Beach",
  "Nature & Wildlife",
  "Adventure",
  "Museum",
];

// Static fallback data
const staticAttractions = [
  {
    id: 1,
    image: lekki,
    title: "Lekki Conservation Centre",
    location: "Lagos",
    rating: 5.0,
    reviews: 567,
    time: "8:30 AM - 5:00 PM",
    price: "₦2,500",
    isTrending: true,
  },
  {
    id: 2,
    image: olumo,
    title: "Olumo Rock",
    location: "Abeokuta",
    rating: 4.0,
    reviews: 66,
    time: "9:00 AM - 6:00 PM",
    price: "₦2,000",
    isTrending: false,
  },
  {
    id: 3,
    image: mapo,
    title: "Mapo Hall",
    location: "Ibadan",
    rating: 4.9,
    reviews: 70,
    time: "8:30 AM - 5:00 PM",
    price: "₦1,500",
    isTrending: false,
  },
  {
    id: 4,
    image: greenLegacy,
    title: "Green Legacy Resort",
    location: "Ogun State",
    rating: 4.0,
    reviews: 434,
    time: "8:30 AM - 10:00 PM",
    price: "₦1,500",
    isTrending: true,
  },
  {
    id: 5,
    image: yankari,
    title: "Yankari National Park",
    location: "Bauchi",
    rating: 5.0,
    reviews: 70,
    time: "8:30 AM - 7:00 PM",
    price: "₦2,000",
    isTrending: true,
  },
  {
    id: 6,
    image: obudu,
    title: "Obudu Mountain Resort",
    location: "Cross River",
    rating: 5.0,
    reviews: 90,
    time: "10:30 AM - 5:00 PM",
    price: "₦3,000",
    isTrending: true,
  },
  {
    id: 7,
    image: millennium,
    title: "Millennium Park",
    location: "Abuja",
    rating: 5.0,
    reviews: 643,
    time: "8:30 AM - 8:30 PM",
    price: "₦2,500",
    isTrending: false,
  },
  {
    id: 8,
    image: nikeGallery,
    title: "Nike Art Gallery",
    location: "Lagos",
    rating: 3.0,
    reviews: 567,
    time: "8:30 AM - 6:00 PM",
    price: "₦1,500",
    isTrending: false,
  },
  {
    id: 9,
    image: agodi,
    title: "Agodi Garden and Zoo",
    location: "Ibadan",
    rating: 5.0,
    reviews: 567,
    time: "8:00 AM - 5:00 PM",
    price: "₦1,500",
    isTrending: true,
  },
];

// ========== HELPER FUNCTIONS ==========

// ✅ Get image URL from API response
const getImageUrl = (place) => {
  // Check for imagesPublicUrl array
  if (place.imagesPublicUrl && Array.isArray(place.imagesPublicUrl) && place.imagesPublicUrl.length > 0) {
    return place.imagesPublicUrl[0];
  }
  
  // Check for images array with secureUrl
  if (place.images && Array.isArray(place.images) && place.images.length > 0) {
    if (place.images[0]?.secureUrl) {
      return place.images[0].secureUrl;
    }
    if (place.images[0]?.publicUrl) {
      return place.images[0].publicUrl;
    }
    if (typeof place.images[0] === 'string') {
      return place.images[0];
    }
  }
  
  // Check for single image fields
  if (place.imagePublicUrl) return place.imagePublicUrl;
  if (place.image) return place.image;
  if (place.coverImage) return place.coverImage;
  if (place.photo) return place.photo;
  
  if (place.photos && Array.isArray(place.photos) && place.photos.length > 0) {
    return place.photos[0];
  }
  
  // Fallback
  return "/novaxcape/placeholder.jpg";
};

// ✅ Get rating
const getRating = (place) => {
  return place.rating || place.averageRating || 4.0;
};

// ✅ Get review count
const getReviewCount = (place) => {
  return place.reviews || place.reviewCount || place._count?.reviews || 0;
};

// ✅ Get price
const getPrice = (place) => {
  if (place.price) return place.price;
  if (place.adultPrice) return `₦${place.adultPrice.toLocaleString()}`;
  if (place.ticketPrice) return `₦${place.ticketPrice.toLocaleString()}`;
  if (place.packages && place.packages.length > 0) {
    const adultPackage = place.packages.find(pkg => pkg.packageType === "Adult");
    if (adultPackage) return `₦${adultPackage.amount.toLocaleString()}`;
    return `₦${place.packages[0].amount.toLocaleString()}`;
  }
  return "Contact";
};

// ✅ Get location
const getLocation = (place) => {
  return [place.city, place.state].filter(Boolean).join(", ") || place.location || "Location not specified";
};

// ✅ Get opening hours
const getOpeningHours = (place) => {
  return place.openingHours || place.time || "Hours not specified";
};

// ✅ Get trending status
const getIsTrending = (place) => {
  return place.isTrending || false;
};

// ========== DISCOVERSECTION COMPONENT ==========
const Discoversection = ({
  searchState = "",
  searchSubmitted = false,
  onClearSearch,
}) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  
  // UI-only build: search filters the static sample list by location
  const validTouristCentres = useMemo(() => {
    const term = searchState.trim().toLowerCase();
    if (!term) return [];
    return staticAttractions.filter((a) =>
      a.location.toLowerCase().includes(term)
    );
  }, [searchState]);

  const hasValidCentres = validTouristCentres.length > 0;
  // ✅ Navigation handlers
  const handleViewDetails = useCallback((centre) => {
    const centreId = centre.id || centre._id || centre.centreId;
    if (!centreId) return;
    navigate(`/centre/${centreId}`, {
      state: { centre },
    });
  }, [navigate]);

  const handleBookNow = useCallback((e, centre) => {
    e.stopPropagation();
    const centreId = centre.id || centre._id || centre.centreId;
    if (!centreId) return;
    localStorage.setItem("centreId", centreId);
    navigate(`/centre/${centreId}`, {
      state: { centre },
    });
  }, [navigate]);

  // ✅ Format price
  const formatPrice = useCallback((price) => {
    if (!price) return "Contact";
    if (typeof price === "number") {
      return `₦${price.toLocaleString()}`;
    }
    return price;
  }, []);

  // ✅ Get centre price
  const getCentrePrice = useCallback((centre) => {
    if (centre.packages && centre.packages.length > 0) {
      const adultPackage = centre.packages.find(
        (pkg) => pkg.packageType === "Adult",
      );
      if (adultPackage) return formatPrice(adultPackage.amount);
      return formatPrice(centre.packages[0].amount);
    }
    return formatPrice(centre.adultPrice || centre.ticketPrice);
  }, [formatPrice]);

  // ✅ Display centers (API data or static fallback)
  const displayCenters = useMemo(() => {
    const hasActiveSearch = searchSubmitted && searchState;
    if (hasActiveSearch) {
      return hasValidCentres ? validTouristCentres : [];
    }
    return staticAttractions;
  }, [searchSubmitted, searchState, hasValidCentres, validTouristCentres]);

  // ✅ Filter by category
  const filteredCenters = useMemo(() => {
    if (activeCategory === "All") return displayCenters;
    return displayCenters.filter((center) => {
      const centreType = (
        center.centreType ||
        center.type ||
        center.category ||
        ""
      ).toLowerCase();
      const category = activeCategory.toLowerCase();
      return centreType.includes(category) || category.includes(centreType);
    });
  }, [activeCategory, displayCenters]);

  const hasActiveSearch = searchSubmitted && searchState;

  const handleCategoryClick = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  // ✅ Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star star--full" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half-star" className="star star--half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star star--empty" />);
    }

    return stars;
  };

  // ✅ Render a single place card
  const renderPlaceCard = (place, isStatic) => {
    const imageSrc = isStatic ? place.image : getImageUrl(place);
    const title = isStatic ? place.title : (place.centreName || place.name || "Tourist Centre");
    const location = isStatic ? place.location : getLocation(place);
    const rating = isStatic ? place.rating : getRating(place);
    const reviews = isStatic ? place.reviews : getReviewCount(place);
    const time = isStatic ? place.time : getOpeningHours(place);
    const price = isStatic ? place.price : getCentrePrice(place);
    const isTrending = isStatic ? place.isTrending : getIsTrending(place);

    return (
      <div 
        className="place-card" 
        key={place.id || place._id}
        onClick={() => handleViewDetails(place)}
        style={{ cursor: "pointer" }}
      >
        <div className="place-image-wrapper">
          <img
            src={imageSrc}
            alt={title}
            className="place-image"
            onError={(e) => {
              e.target.src = "/novaxcape/placeholder.jpg";
            }}
          />
          {isTrending && (
            <span className="trending-badge">
              <FiTrendingUp className="badge-icon" /> Trending
            </span>
          )}
        </div>

        <div className="place-body">
          <h3>{title}</h3>
          <p className="location">{location}</p>

          <div className="details-row">
            <div className="rating">
              {renderStars(rating)}
              <span>{typeof rating === 'number' ? rating.toFixed(1) : '0.0'}</span>
              <small>({reviews})</small>
            </div>

            <div className="time">
              <FaRegClock />
              <span>{time}</span>
            </div>
          </div>

          <div className="price-row">
            <div>
              <small>From</small>
              <h4>{price}</h4>
            </div>

            <button 
              className="book-btn"
              onClick={(e) => handleBookNow(e, place)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };


  // ✅ No results state
  if (hasActiveSearch && !hasValidCentres) {
    return (
      <section className="discover-section">
        <div className="category-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="no-results-container">
          <p className="no-results-text">
            No centres found in "{searchState}". Try a different state or check back later.
          </p>
          <button className="browse-all-btn" onClick={onClearSearch}>
            Browse All Centres
          </button>
        </div>
      </section>
    );
  }

  // ✅ Main render
  return (
    <section className="discover-section">
      {/* Categories */}
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Results Header */}
      {hasActiveSearch && (
        <div className="search-results-header">
          <h2>Search results for "{searchState}"</h2>
          <p>{filteredCenters.length} centre(s) found</p>
        </div>
      )}

      {/* Places Grid */}
      {filteredCenters.length > 0 && (
        <div className="places-grid">
          {filteredCenters.map((place, index) => {
            const isStatic = place.title && !place.centreName;
            return renderPlaceCard(place, isStatic);
          })}
        </div>
      )}
    </section>
  );
};

export default Discoversection;