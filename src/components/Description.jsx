import React from 'react';
import { FaCheckCircle, FaHeart } from 'react-icons/fa';
import './css/Description.css';

const Description = () => {
  return (
    <div className='description-container'>
      <div className='desc-left'>
        <div className='features-row'>
          <div className='feature-item'>
            <FaCheckCircle className='feature-icon' />
            <div className='feature-text'>
              <span className='feature-label'>Duration</span>
              <span className='feature-value'>1 day</span>
            </div>
          </div>

          <div className='feature-item'>
            <FaCheckCircle className='feature-icon' />
            <div className='feature-text'>
              <span className='feature-label'>Activity Level</span>
              <span className='feature-value'>Topnotch</span>
            </div>
          </div>

          <div className='feature-item'>
            <FaCheckCircle className='feature-icon' />
            <div className='feature-text'>
              <span className='feature-label'>Includes</span>
              <span className='feature-value'>Ticket, Transportation, Equipment</span>
            </div>
          </div>
        </div>

        <div className='description-text'>
          <h2>Description</h2>
          <p>
            Lekki Conservation Centre is nestled on the scenic Lekki Peninsula in Lagos. The Lekki Conservation Centre is a beautiful 78-hectare natural conservation area dedicated to preserving Nigeria's rich biodiversity.
            <br /><br />
            The centre is famously home to the longest canopy walkway in Africa, stretching an impressive 401 metres above the lush mangrove forest. As you walk across this elevated pathway, you'll enjoy breathtaking panoramic views of the swampy forest below for a truly unforgettable experience that feels like floating through the treetops. <span className='read-more'>Read more</span>
          </p>
        </div>

        <div className='action-buttons'>
          <button className='book-btn'>Book Now</button>
          <button className='favorite-btn'>
            Add a favorite <FaHeart className='heart-icon' />
          </button>
        </div>
      </div>

      <div className='desc-right'>
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Location Map" 
          className='map-image'
        />
      </div>
    </div>
  );
};

export default Description;