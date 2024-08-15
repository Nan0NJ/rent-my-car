import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './../../css/cardetails-style.css';

const CarDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [reviewText, setReviewText] = useState(''); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://88.200.63.148:8228/cars/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Failed to fetch car details');
      }
    };

    const fetchCarReviews = async () => {
      try {
        const response = await fetch(`http://88.200.63.148:8228/reviews?car_id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews');
      }
    };

    fetchCarDetails();
    fetchCarReviews();
  }, [id]);

  const handlePostReview = async () => {
    if (!reviewText.trim()) return;
  
    try {
      const response = await fetch(`http://88.200.63.148:8228/reviews/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car_id: id,
          user_email: localStorage.getItem('loggedEmail'),
          user_fullname: localStorage.getItem('fullname'),
          review_text: reviewText,
        }),
      });
  
      if (response.ok) {
        setReviewText(''); 
        window.location.reload(); // Refresh the browser
      } else {
        console.error('Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };  

  if (error) {
    return <p>{error}</p>;
  }

  if (!car) {
    return <p>Loading car details...</p>;
  }

  const imageUrl = car.car_img ? `data:image/jpeg;base64,${car.car_img}` : '';

  return (
    <div className="car-details">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={car.car_name}
          className="car-imgDETAILS"
        />
      )}
      <div className="car-info">
        <h3 className="car-title-detail">{car.car_name}</h3>
        <p className="car-detail-text">Category: {car.car_category}</p>
        <p className="car-detail-text">Price: {car.car_price} € (per day)</p>
        <p className="car-detail-text">Model Year: {car.model_year}</p>
        <p className="car-detail-text">Location: {car.car_location}</p>
        <p className="car-detail-text">Additional Information: {car.car_information}</p>
        
        <div className="button-container">
          <button className="rent-buttonCAR">Rent Now</button>
          <button className="back-buttonCAR" onClick={() => navigate(-1)}>
            Return Back
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Leave a Review</h3>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="review-textarea"
        />
        <button onClick={handlePostReview} className="post-review-button">Post Review</button>
        
        <h3>Reviews</h3>
        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.review_id} className="review-item">
                <p className="review-text">{review.review_text}</p>
                <small className="review-meta">Posted by: {review.user_fullname} | email: {review.user_email} --- {new Date(review.review_date).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;