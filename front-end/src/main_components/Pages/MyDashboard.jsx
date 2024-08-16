import React, { useState, useEffect } from 'react';
import './../../css/mydashboard-style.css';
import AddCar from './AddCar';
import './../../css/addcar-style.css';

const Dashboard = () => {
  const storedEmail = localStorage.getItem('loggedEmail');
  const approvalStatus = localStorage.getItem('approvalStatus');

  const [user, setUser] = useState({
    name: '',
    email: storedEmail,
    age: '',
  });
  const [publishedCars, setPublishedCars] = useState([]);
  const [showPublishedCars, setShowPublishedCars] = useState(false);
  const [showAddCar, setShowAddCar] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [carToRemove, setCarToRemove] = useState(null);

  useEffect(() => {
    if (!storedEmail) return;

    // Fetch user details
    fetch(`http://88.200.63.148:8228/users/userdetails?email=${storedEmail}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setUser(u => ({
            ...u,
            name: data[0].fullname,
            email: data[0].email,
            age: data[0].age,
          }));
        }
      })
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch published cars
    fetch(`http://88.200.63.148:8228/cars/published-cars?email=${storedEmail}`)
      .then(response => response.json())
      .then(data => {
        setPublishedCars(data);
      })
      .catch(error => console.error('Error fetching published cars:', error));
  }, [storedEmail]);

  const handleAddCarSuccess = (newCar) => {
    setPublishedCars([...publishedCars, newCar]);
  };

  const handleRemoveCarAndReviews = async () => {
    if (!carToRemove) return;

    // Close the pop-up immediately
    setShowRemovePopup(false);

    try {
      // Remove the car and associated reviews
      const carResponse = await fetch('http://88.200.63.148:8228/cars/deletecar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ car_id: carToRemove.car_id }),
      });

      const reviewResponse = await fetch('http://88.200.63.148:8228/reviews/delete-by-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ car_id: carToRemove.car_id }),
      });

      if (carResponse.ok && reviewResponse.ok) {
        // Update the state to remove the car from the list
        setPublishedCars(publishedCars.filter(car => car.car_id !== carToRemove.car_id));
      } else {
        console.error('Failed to remove car or reviews');
      }
    } catch (error) {
      console.error('Error removing car and reviews:', error);
    }
  };

  if (approvalStatus === '0' || approvalStatus === null) {
    return (
      <div className="awaiting-verification">
        <p>Awaiting Verification, Please be patient!</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="account-info">
          <h2>Account Information</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
        </div>

        <div className="accordion-section">
          <h2 onClick={() => setShowPublishedCars(!showPublishedCars)}>
            Published Cars
            <button className="accordion-toggle">
              {showPublishedCars ? '▲' : '▼'}
            </button>
          </h2>
          {showPublishedCars && (
            <div className="accordion-content">
              {publishedCars.length > 0 ? (
                publishedCars.map(car => (
                  <div key={car.car_id} className="car-item">
                    <img src={`data:image/jpeg;base64,${car.car_img}`} alt={car.car_name} className="car-img" />
                    <div className="car-info">
                      <h3>{car.car_name}</h3>
                      <p>Category: {car.car_category}</p>
                      <p>Price: {car.car_price} €</p>
                      <p>Model Year: {car.model_year}</p>
                      <p>Status: {car.car_approved === 1 ? 'Approved' : 'Pending Approval'}</p>
                      {car.car_approved === 1 && (
                        <button
                          className="remove-car-button"
                          onClick={() => {
                            setCarToRemove(car);
                            setShowRemovePopup(true);
                          }}
                        >
                          Remove Car
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No published cars</p>
              )}
            </div>
          )}
        </div>

        <div className="add-rented-car-section">
          <h2>Publish Your Vehicle:</h2>
          <div className="add-rented-car-button-container">
            <button className="add-rented-car-button" onClick={() => setShowAddCar(true)}>Add Car</button>
          </div>
        </div>

        {showAddCar && (
          <div className="modal">
            <div className="formADD">
              <button className="close-button" onClick={() => setShowAddCar(false)}>✖</button>
              <AddCar onAddCarSuccess={handleAddCarSuccess} onClose={() => setShowAddCar(false)} />
            </div>
          </div>
        )}

        {showRemovePopup && (
          <div className="modal">
            <div className="formREMOVE">
              <p>Are you sure you want to remove {carToRemove?.car_name} and all associated reviews?</p>
              <button onClick={handleRemoveCarAndReviews} className="confirm-remove-button">Yes, Remove</button>
              <button onClick={() => setShowRemovePopup(false)} className="cancel-remove-button">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;