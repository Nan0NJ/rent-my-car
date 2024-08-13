import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './../../css/cardetails-style.css';

const CarDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log(`Fetching car details for ID: ${id}`);
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

    fetchCarDetails();
  }, [id]);

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
        <p className="car-detail-text">Price: {car.car_price} €</p>
        <p className="car-detail-text">Model Year: {car.model_year}</p>
        <p className="car-detail-text">Location: {car.car_location}</p>
        <p className="car-detail-text">Additional Information: {car.car_information}</p>
        
        {/* Button container for centering */}
        <div className="button-container">
          <button className="rent-buttonCAR">Rent Now</button>
          <button className="back-buttonCAR" onClick={() => navigate(-1)}>
            Return Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;