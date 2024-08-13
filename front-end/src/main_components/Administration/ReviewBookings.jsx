import React, { useEffect, useState } from "react";
import "./../../css/reviewcar-style.css"; 
const ReviewBookings = () => {
  const [cars, setCars] = useState([]);
  const [carDetails, setCarDetails] = useState({});

  useEffect(() => {
    fetch("http://88.200.63.148:8228/cars/unapproved")
      .then(response => response.json())
      .then(data => {
        setCars(data);
        data.forEach(car => {
          fetch(`http://88.200.63.148:8228/users/userdetails?email=${car.car_owner}`)
            .then(response => response.json())
            .then(userData => {
              setCarDetails(prevDetails => ({
                ...prevDetails,
                [car.car_id]: {
                  ownerName: userData[0].fullname,
                  driversLicense: userData[0].image
                }
              }));
              console.log(`Car ID: ${car.car_id}, Driver's License: ${userData[0].image}`);
            })
            .catch(error => {
              console.error(`There was an error fetching details for ${car.car_owner}!`, error);
            });
        });
      })
      .catch(error => {
        console.error("There was an error fetching the cars!", error);
      });
  }, []);
  

  const handleApprove = (car_id) => {
    // Handle approve functionality
  };

  const handleReject = (car_id) => {
    // Handle reject functionality
  };

  return (
    <div>
      <h2>Review Bookings</h2>
      <p>Details about bookings are given below. (Assert and Review them)</p>
      <div className="reviewcar-container">
        {cars.map(car => (
          <div key={car.car_id} className="reviewcar-card">
          <label className="reviewcar-label">Car For Review:</label>
          <h3 className="reviewcar-name">{car.car_name}</h3>
          <p className="reviewcar-category">Category: {car.car_category}</p>
          <p className="reviewcar-year">Model Year: {car.model_year}</p>
          <p className="reviewcar-mileage">Mileage: {car.car_mileage}</p>
          <p className="reviewcar-price">User Worth Estimate: {car.car_price} €</p>
          {car.car_img && (
            <img src={`data:image/jpeg;base64,${car.car_img}`} alt={`${car.car_name}`} className="reviewcar-image"/>
          )}
          <label className="reviewcar-label">Green Card:</label>
          {car.green_card && (
            <img src={`data:image/jpeg;base64,${car.green_card}`} alt={`${car.car_name} green card`} className="reviewcar-greencard"/>
          )}
          <p className="reviewcar-owner">Owner Email: {car.car_owner}</p>
          <p className="reviewcar-ownername">Owner's Name: {carDetails[car.car_id]?.ownerName || 'Loading...'}</p>
          <label className="reviewcar-label">Driver's License:</label>
          {carDetails[car.car_id]?.driversLicense && (
            <img
              src={`data:image/jpeg;base64,${carDetails[car.car_id]?.driversLicense}`}
              alt="Driver's License"
              className="reviewcar-driverslicense"
            />
          )}
          <div className="reviewcar-actions">
            <button className="reviewcar-button" onClick={() => handleApprove(car.car_id)}>Approve</button>
            <button className="reviewcar-button" onClick={() => handleReject(car.car_id)}>Reject</button>
          </div>
        </div>        
        ))}
      </div>
    </div>
  );
};

export default ReviewBookings;
