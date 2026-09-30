import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/PopularDestinations.css";

// UI-only build: static sample data (no API calls)
const cities = [
  { name: "Lagos", centreCount: 24, image: "/novaxcape/lagos.jpg" },
  { name: "Ibadan", centreCount: 12, image: "/novaxcape/Ibadan.jpg" },
  { name: "Abuja", centreCount: 18, image: "/novaxcape/abuja.jpg" },
  { name: "Port Harcourt", centreCount: 9, image: "/novaxcape/port.jpg" },
];

const PopularDestinations = () => {
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    navigate("/discover", {
      state: {
        searchState: cityName,
        selectedLocation: cityName,
        searchSubmitted: true,
      },
    });
  };

  return (
    <section className="popular-destination">
      <div className="popular-destination__header">
        <h2 className="popular-destination__title">
          Popular Destination
        </h2>

        <p className="popular-destination__subtitle">
          Explore Top Cities with the most attractions
        </p>
      </div>

      <div className="popular-destination__grid">
        {cities.map((city) => (
          <div
            key={city.name}
            className="popular-destination__card"
            onClick={() => handleCityClick(city.name)}
          >
            <img
              src={city.image}
              alt={city.name}
              className="popular-destination__image"
            />

            <div className="popular-destination__overlay">
              <div className="popular-destination__info">
                <h3>{city.name}</h3>
                <p>{city.centreCount} Attractions</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
