import React from 'react'

const UserFeatures = () => {
  return (
    <>
       <section className="reviews-carousel-block">
          <h2 className="block-section-heading">View all Reviews</h2>
          <div className="reviews-cards-container">
            <div className="themed-review-card">
              <div className="user-profile-summary">
                <div className="avatar-placeholder">👤</div>
                <div>
                  <h4 className="user-fullname">Nnaneme O.</h4>
                  <div className="stars-row">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="review-body-text">
                Absolutely loved the canopy walkway! It was so long and the view
                from the top is breathtaking. A must visit for anyone in Lagos.
                Very well maintained.
              </p>
            </div>

            <div className="themed-review-card">
              <div className="user-profile-summary">
                <div className="avatar-placeholder">👤</div>
                <div>
                  <h4 className="user-fullname">Tunde S.</h4>
                  <div className="stars-row">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="review-body-text">
                Perfect for a family outing. My kids enjoyed the canopy walk and
                the playground area. The boardwalks are clean and safe. Highly
                recommended!
              </p>
            </div>

            <div className="themed-review-card">
              <div className="user-profile-summary">
                <div className="avatar-placeholder">👤</div>
                <div>
                  <h4 className="user-fullname">Salewa Ahmed</h4>
                  <div className="stars-row">⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="review-body-text">
                The place is beautiful and peaceful. Saw so many monkeys and
                birds. However, the ticket price is a bit high compared to other
                parks. Still worth it though.
              </p>
            </div>
          </div>

          <div className="carousel-navigation-arrows">
            <button className="nav-arrow">&lt;</button>
            <button className="nav-arrow active-arrow">&gt;</button>
          </div>
        </section>

     
        <section className="recommendations-container-section">
          <h2 className="block-section-heading">
            Destinations you may also like
          </h2>
          <div className="recommendations-cards-grid">
         
            <div className="themed-destination-card">
              <div className="destination-thumbnail">
                <img
                  src=""
                  alt="Lekki Conservation Centre mini"
                />
              </div>
              <div className="destination-details-box">
                <h3 className="destination-name-title">
                  Lekki Conservation Centre
                </h3>
                <p className="destination-location-state">Lagos</p>
                <div className="destination-ratings-timetable">
                  <span className="star-rating-orange">
                    ⭐⭐⭐⭐⭐ <strong className="bold-rate-value">5.0</strong>{" "}
                    <span className="total-votes-count">(567)</span>
                  </span>
                  <span className="time-window-span">⏰ 8:30 AM - 5:00 PM</span>
                </div>
                <div className="destination-card-footer">
                  <span className="price-label-text">
                    From <br />
                    <strong className="currency-bold">2500</strong>
                  </span>
                  <img
                    src=""
                    alt=""
                    className="footer-star-decor"
                  />
                  <button className="orange-card-book-btn">Book Now</button>
                </div>
              </div>
            </div>


            <div className="themed-destination-card">
              <div className="destination-thumbnail">
                <img
                  src=""
                  alt="Olumo Rock"
                />
              </div>
              <div className="destination-details-box">
                <h3 className="destination-name-title">Olumo Rock</h3>
                <p className="destination-location-state">Abeokuta</p>
                <div className="destination-ratings-timetable">
                  <span className="star-rating-orange">
                    ⭐⭐⭐⭐⭐ <strong className="bold-rate-value">4.0</strong>{" "}
                    <span className="total-votes-count">(89)</span>
                  </span>
                  <span className="time-window-span">⏰ 9:00 AM - 6:00 PM</span>
                </div>
                <div className="destination-card-footer">
                  <span className="price-label-text">
                    From <br />
                    <strong className="currency-bold">2000</strong>
                  </span>
                  <button className="orange-card-book-btn">Book Now</button>
                </div>
              </div>
            </div>

   
            <div className="themed-destination-card">
              <div className="destination-thumbnail">
                <img
                  src=""
                  alt="Mapo Hall"
                />
              </div>
              <div className="destination-details-box">
                <h3 className="destination-name-title">Mapo Hall</h3>
                <p className="destination-location-state">Ibadan</p>
                <div className="destination-ratings-timetable">
                  <span className="star-rating-orange">
                    ⭐⭐⭐⭐⭐ <strong className="bold-rate-value">4.9</strong>{" "}
                    <span className="total-votes-count">(76)</span>
                  </span>
                  <span className="time-window-span">⏰ 8:30 AM - 5:00 PM</span>
                </div>
                <div className="destination-card-footer">
                  <span className="price-label-text">
                    From <br />
                    <strong className="currency-bold">1500</strong>
                  </span>
                  <button className="orange-card-book-btn">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default UserFeatures
