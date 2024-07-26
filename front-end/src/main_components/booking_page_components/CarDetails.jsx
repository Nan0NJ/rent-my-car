import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Importing files
import Cars from './CarItems';
import './../../css/cardetails-style.css';
import TEST from './../../imgs/footer_car.png'; // LATER CHANGE TO DATABASE

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = Cars.find(car => car.id === parseInt(id));

  if (!car) {
    return <p>Car not found</p>;
  }

  return (
    <div className="car-details">
      <img src={TEST} alt={car.name} className="car-img" />
      <div className="car-info">
        <h3 className='car-title-detail'>{car.name}</h3>
        <p className='car-detail-text'>Category: {car.category}</p>
        <p className='car-detail-text'>Price: {car.price} €</p>
        <p className='car-detail-text'>Model Year: {car.modelYear}</p>
        <p className='car-detail-text'>Additional Information: {car.information}</p>
        <p className='car-detail-status'>Status: {car.taken ? 'Taken' : 'Available'}</p>
        <button className="rent-button" disabled={car.taken}>Rent Now</button>
        <button className="back-button" onClick={() => navigate(-1)}>Return Back</button>
      </div>
    </div>
  );
};

export default CarDetails;
