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
                [car.car_name + '_' + car.car_owner]: {
                  ownerName: userData[0].fullname,
                  driversLicense: userData[0].image
                }
              }));
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
    console.log("Approving car with ID:", car_id);

    fetch("http://88.200.63.148:8228/cars/matchcar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ car_id }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to approve the car');
        }
        return response.json();
      })
      .then(data => {
        if (data.message) {
          alert(data.message);
          // Optionally, remove the approved car from the local state
          setCars(cars.filter(car => (car.car_name + '_' + car.car_owner) !== car_id));
        } else {
          alert("Failed to update car approval status");
        }
      })
      .catch(error => {
        console.error("There was an error updating the car approval status!", error);
      });
  };

  const handleReject = (car_id) => {
    fetch("http://88.200.63.148:8228/cars/deletecar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ car_id }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to reject the car');
        }
        return response.json();
      })
      .then(data => {
        if (data.message) {
          alert(data.message);
          // Remove the rejected car from the local state
          setCars(cars.filter(car => (car.car_name + '_' + car.car_owner) !== car_id));
        } else {
          alert("Failed to delete car");
        }
      })
      .catch(error => {
        console.error("There was an error deleting the car!", error);
      });
  };

  return (
    <div>
      <h2>Review Bookings</h2>
      <p>Details about bookings are given below. (Assert and Review them)</p>
      <div className="reviewcar-container">
        {cars.map(car => {
          const car_id = car.car_name + '_' + car.car_owner;
          return (
            <div key={car_id} className="reviewcar-card">
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
              <p className="reviewcar-ownername">Owner's Name: {carDetails[car_id]?.ownerName || 'Loading...'}</p>
              <label className="reviewcar-label">Driver's License:</label>
              {carDetails[car_id]?.driversLicense && (
                <img
                  src={`data:image/jpeg;base64,${carDetails[car_id]?.driversLicense}`}
                  alt="Driver's License"
                  className="reviewcar-driverslicense"
                />
              )}
              <div className="reviewcar-actions">
                <button className="reviewcar-button" onClick={() => handleApprove(car_id)}>Approve</button>
                <button className="reviewcar-button" onClick={() => handleReject(car_id)}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewBookings;
