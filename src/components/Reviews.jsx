import React, { useState, useRef } from 'react'
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './css/Reviews.css'

const reviewsData = [
  {
    id: 1,
    name: 'Nnaneme D.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: "Absolutely loved the canopy walkway! It was so long and the view from the top is breathtaking. A must-visit for anyone in Lagos. Very well maintained."
  },
  {
    id: 2,
    name: 'Tunde S.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    text: "Perfect for a family outing. My kids enjoyed the canopy walk and the playground area. The boardwalks are clean and safe. Highly recommended!"
  },
  {
    id: 3,
    name: 'Salewa Ahmed',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    text: "The place is beautiful and peaceful. Saw so many monkeys and birds. However, the ticket price is a bit high compared to other parks. Still worth it though."
  },
  {
    id: 4,
    name: 'Chidinma K.',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 5,
    text: "An amazing experience. The staff were friendly and knowledgeable about the wildlife. The canopy walkway is not for the faint of heart but totally worth it!"
  },
  {
    id: 5,
    name: 'Emeka O.',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 4,
    text: "Great spot for nature lovers. A bit crowded on weekends, so I'd recommend visiting on a weekday morning for the best experience."
  }
]

const Reviews = () => {
  const [startIndex, setStartIndex] = useState(0)
  const cardsToShow = 3

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, reviewsData.length - cardsToShow)
    )
  }

  const isPrevDisabled = startIndex === 0
  const isNextDisabled = startIndex >= reviewsData.length - cardsToShow

  return (
    <div className='reviews-container'>
      <h2 className='reviews-title'>View all Reviews</h2>

      <div className='reviews-track-wrapper'>
        <div
          className='reviews-track'
          style={{
            transform: `translateX(calc(-${startIndex} * (100% / ${cardsToShow} + 1rem)))`
          }}
        >
          {reviewsData.map((review) => (
            <div className='review-card' key={review.id}>
              <div className='review-header'>
                <img
                  src={review.avatar}
                  alt={review.name}
                  className='review-avatar'
                />
                <div className='review-header-text'>
                  <h4 className='review-name'>{review.name}</h4>
                  <div className='review-stars'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className='review-text'>{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='review-nav'>
        <button
          className='nav-btn'
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          <FaArrowLeft />
        </button>
        <button
          className='nav-btn nav-btn-active'
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Reviews