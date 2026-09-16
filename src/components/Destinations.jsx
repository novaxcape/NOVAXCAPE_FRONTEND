import React from 'react'
import { FaStar, FaClock } from 'react-icons/fa'
import './css/Destinations.css'

const destinationsData = [
  {
    id: 1,
    name: 'Lekki Conservation Centre',
    location: 'Lagos',
    image: 'https://i.postimg.cc/mr9Y2kfT/35078407a2d783dd3e38dc1c227f781dd792e6f0.png',
    rating: 5.0,
    reviewCount: 567,
    hours: '8:30 AM - 5:00 PM',
    price: 2500
  },
  {
    id: 2,
    name: 'Olumo Rock',
    location: 'Abeokuta',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    rating: 4.0,
    reviewCount: 66,
    hours: '9:00 AM - 6:00 PM',
    price: 2000
  },
  {
    id: 3,
    name: 'Mapo Hall',
    location: 'Ibadan',
    image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 70,
    hours: '8:30 AM - 5:00 PM',
    price: 1500
  }
]

const Destinations = () => {
  return (
    <div className='destinations-container'>
      <h2 className='destinations-title'>Destinations you may also like</h2>

      <div className='destinations-grid'>
        {destinationsData.map((dest) => (
          <div className='destination-card' key={dest.id}>
            <div className='destination-image-wrapper'>
              <img src={dest.image} alt={dest.name} className='destination-image' />
            </div>

            <div className='destination-body'>
              <h3 className='destination-name'>{dest.name}</h3>
              <p className='destination-location'>{dest.location}</p>

              <div className='destination-meta'>
                <div className='destination-rating'>
                  <FaStar className='meta-star' />
                  <span className='meta-score'>{dest.rating.toFixed(1)}</span>
                  <span className='meta-count'>({dest.reviewCount})</span>
                </div>
                <div className='destination-hours'>
                  <FaClock className='meta-clock' />
                  <span>{dest.hours}</span>
                </div>
              </div>

              <div className='destination-footer'>
                <div className='destination-price'>
                  <span className='price-label'>From</span>
                  <span className='price-value'>{dest.price.toLocaleString()}</span>
                </div>
                <button className='destination-book-btn'>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Destinations