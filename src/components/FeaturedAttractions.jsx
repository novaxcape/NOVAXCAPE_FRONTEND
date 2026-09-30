// File: src/components/FeaturedAttractions.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/FeaturedAttractions.css";
import { FaStar, FaRegClock } from "react-icons/fa";

import lekki from "/novaxcape/lekki.png";
import olumo from "/novaxcape/olumo.png";
import mapo from "/novaxcape/mapo.png";
import greenLegacy from "/novaxcape/greenLegacy.png";
import yankari from "/novaxcape/yankari.png";
import obudu from "/novaxcape/obudu.png";
import millennium from "/novaxcape/millennium.png";
import nikeGallery from "/novaxcape/nikeGallery.png";
import agodi from "/novaxcape/agodi.png";

// ── Static sample data (UI-only build) ──
const ATTRACTIONS = [
  {
    id: "1",
    image: lekki,
    centreName: "Lekki Conservation Centre",
    city: "Lagos",
    rating: 5.0,
    reviews: 567,
    openingHours: "8:30 AM - 5:00 PM",
    price: 2500,
  },
  {
    id: "2",
    image: olumo,
    centreName: "Olumo Rock",
    city: "Abeokuta",
    rating: 4.0,
    reviews: 66,
    openingHours: "9:00 AM - 6:00 PM",
    price: 2000,
  },
  {
    id: "3",
    image: mapo,
    centreName: "Mapo Hall",
    city: "Ibadan",
    rating: 4.9,
    reviews: 70,
    openingHours: "8:30 AM - 5:00 PM",
    price: 1500,
  },
  {
    id: "4",
    image: greenLegacy,
    centreName: "Green Legacy Resort",
    city: "Ogun State",
    rating: 4.0,
    reviews: 434,
    openingHours: "8:30 AM - 10:00 PM",
    price: 1500,
  },
  {
    id: "5",
    image: yankari,
    centreName: "Yankari National Park",
    city: "Bauchi",
    rating: 5.0,
    reviews: 70,
    openingHours: "8:30 AM - 7:00 PM",
    price: 2000,
  },
  {
    id: "6",
    image: obudu,
    centreName: "Obudu Mountain Resort",
    city: "Cross River",
    rating: 5.0,
    reviews: 90,
    openingHours: "10:30 AM - 5:00 PM",
    price: 3000,
  },
  {
    id: "7",
    image: millennium,
    centreName: "Millennium Park",
    city: "Abuja",
    rating: 5.0,
    reviews: 643,
    openingHours: "8:30 AM - 8:30 PM",
    price: 2500,
  },
  {
    id: "8",
    image: nikeGallery,
    centreName: "Nike Art Gallery",
    city: "Lagos",
    rating: 3.0,
    reviews: 567,
    openingHours: "8:30 AM - 6:00 PM",
    price: 1500,
  },
  {
    id: "9",
    image: agodi,
    centreName: "Agodi Garden and Zoo",
    city: "Ibadan",
    rating: 5.0,
    reviews: 567,
    openingHours: "8:00 AM - 5:00 PM",
    price: 1500,
  },
];


const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`f-${i}`} color="#ff6b35" />);
  }
  if (hasHalf) {
    stars.push(<FaStar key="half" color="#ff6b35" opacity={0.5} />);
  }
  while (stars.length < 5) {
    stars.push(<FaStar key={`e-${stars.length}`} color="#ddd" />);
  }
  return stars;
};

const formatPrice = (price) => `₦${Number(price).toLocaleString()}`;

const FeaturedAttractions = () => {
  const navigate = useNavigate();
  const allCentres = ATTRACTIONS;
  const handleCardClick = (centre, meta) => {
    const centreId = centre.id || centre._id;
    navigate(`/centre/${centreId}`, {
      state: {
        centre: {
          id: centreId,
          centreName: centre.centreName || centre.name,
          city: centre.city || centre.state,
          state: centre.state || centre.city,
          description:
            centre.description ||
            `${centre.centreName || centre.name} is a popular tourist attraction in ${centre.city || centre.state}.`,
          images: centre.imagesPublicUrl ||
            centre.images?.map((img) => img.secureUrl) ||
            [centre.image],
          openingHours: centre.openingHours || meta.openingHours,
          rating: meta.rating,
          reviews: meta.reviews,
          packages: [
            {
              id: centreId,
              packageName: "Adult Ticket",
              packageType: "Adult",
              amount: centre.price || meta.price,
              numberOfPeople: "1",
            },
          ],
        },
      },
    });
  };


  return (
    <section className="attractions">
      <div className="featured-section-header">
        <h2 className="featured-section-title">Featured Attractions</h2>
      </div>
      <p className="featured-section-subtitle">
        Discover the most popular tourism centres across Nigeria
      </p>

      {/* Cards */}
      <div className="attractions_grid">
        {allCentres.map((centre, index) => {
          const meta = {
            rating: centre.rating,
            reviews: centre.reviews,
            openingHours: centre.openingHours,
            price: centre.price,
          };
          // Get image URL
          const imageUrl =
            centre.image ||
            centre.imagesPublicUrl?.[0] ||
            centre.images?.[0]?.secureUrl ||
            "/novaxcape/placeholder.png";

          // Get centre name and location
          const centreName = centre.centreName || centre.name || "Attraction";
          const location = centre.city || centre.state || "Location";

          return (
            <div
              className="attraction_card"
              key={centre.id || centre._id || index}
              onClick={() => handleCardClick(centre, meta)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={imageUrl}
                alt={centreName}
                onError={(e) => { e.target.src = "/novaxcape/placeholder.png"; }}
              />

              <div className="card_content">
                <h3>{centreName}</h3>
                <h4>{location}</h4>

                <div className="card_details">
                  <div className="rating">
                    {renderStars(meta.rating)}
                    <span>{typeof meta.rating === 'number' ? meta.rating.toFixed(1) : meta.rating}</span>
                    <small>({meta.reviews || 0})</small>
                  </div>

                  <div className="time">
                    <FaRegClock />
                    <span>{meta.openingHours}</span>
                  </div>
                </div>

                {/* ✅ Added Price and Book Now Button */}
                <div className="bottom_section">
                  <div>
                    <p>From</p>
                    <h2>{formatPrice(meta.price)}</h2>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(centre, meta);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
 
export default FeaturedAttractions;