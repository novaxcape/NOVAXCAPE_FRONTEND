import React from 'react'
import { FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa';

const ProductHero = () => {
  return (
    <div className='product-hero'>
      <div className='product-holder'>

        {/* 1. Title Section */}
        <h1 className="title">Lekki Conservation Centre</h1>

        {/* 2. Details Row */}
        <div className="details-row">
          <div className="detail-item">
            <FaMapMarkerAlt className="icon location-icon" />
            <span>Lekki Lagos State</span>
          </div>

          <div className="detail-item">
            <FaClock className="icon clock-icon" />
            <span>Daily 8AM - 6PM</span>
          </div>

          <div className="detail-item rating">
            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span className="score">5.0</span>
            <span className="count">(567)</span>
          </div>
        </div>

        {/* 3. Tags Row */}
        <div className="tags-row">
          <button className="tag">Nature trails</button>
          <button className="tag">Picnic Areas</button>
          <button className="tag">WildLife Viewing</button>
          <button className="tag">Canopy walkway</button>
        </div>

        {/* 4. Image Gallery — now inside the same card */}
        <div className='image'>
          <div className='image1'>
            <img src="https://i.postimg.cc/mr9Y2kfT/35078407a2d783dd3e38dc1c227f781dd792e6f0.png" alt="Lekki Conservation Centre aerial view" />
          </div>
          <div className='image2'>
            <div className='img1'>
              <img src="https://i.postimg.cc/7bvD4Kgf/4ce9a61416aedb9f3e2cfb20add35bdd95153bf6.jpg" alt="Canopy walkway" />
            </div>
            <div className='img2'>
              <img src="https://i.postimg.cc/Wz0pdRp6/47b4276c62985300e223f6ab00190fd8ea4c0016.jpg" alt="Scenic view" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductHero