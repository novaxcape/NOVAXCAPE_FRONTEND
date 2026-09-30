// File: src/Pages/Discoverpage.jsx

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Discoverpagehero from "../components/Discoverpagehero";
import Discoversection from "../components/Discoversection";
import Footer from "../components/Footer";

const Discoverpage = () => {
  const location = useLocation();
  const [searchState, setSearchState] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  // Pick up a search term coming from the Hero, PopularDestinations or the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const term =
      location.state?.searchLocation ||
      location.state?.searchState ||
      queryParams.get("location");

    if (term) {
      setSearchState(term);
      setSelectedLocation(location.state?.selectedLocation || term);
      setSearchSubmitted(true);
    }
  }, [location]);

  const handleSearch = (searchTerm) => {
    const term = (searchTerm || searchState).trim();
    if (!term) return;
    setSearchState(term);
    setSelectedLocation(term);
    setSearchSubmitted(true);
  };

  const handleClearSearch = () => {
    setSearchState("");
    setSelectedLocation("");
    setSearchSubmitted(false);
  };

  return (
    <div>
      <Discoverpagehero
        searchState={searchState}
        setSearchState={setSearchState}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onSearch={handleSearch}
        loading={false}
      />
      <Discoversection
        searchState={searchState}
        searchSubmitted={searchSubmitted}
        onClearSearch={handleClearSearch}
      />
      <Footer />
    </div>
  );
};

export default Discoverpage;
