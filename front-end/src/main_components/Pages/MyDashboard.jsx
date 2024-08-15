import React, { useState, useEffect } from 'react';
import './../../css/mydashboard-style.css';
import AddCar from './AddCar'; // Import the AddCar component
import './../../css/addcar-style.css'; // Import the new CSS file

const Dashboard = () => {
  const storedEmail = localStorage.getItem('loggedEmail');
  const approvalStatus = localStorage.getItem('approvalStatus');

  const [user, setUser] = useState({
    name: '',
    email: storedEmail,
    age: '',
  });
  const [publishedCars, setPublishedCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [showPublishedCars, setShowPublishedCars] = useState(false);
  const [showAddCar, setShowAddCar] = useState(false); // State to manage AddCar modal visibility

  useEffect(() => {
    if (!storedEmail) return;

    // Fetch user details
    fetch(`http://88.200.63.148:8228/users/userdetails?email=${storedEmail}`)
      .then(response => response.json())
      .then(data => {
        console.log('User details data:', data); // Log the response data
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
        console.log('Published cars data:', data); // Log the response data
        setPublishedCars(data);
      })
      .catch(error => console.error('Error fetching published cars:', error));
  }, [storedEmail]);

  const handleAddCarSuccess = (newCar) => {
    setCars([...cars, newCar]);
    setPublishedCars([...publishedCars, newCar]);
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
      </div>
    </div>
  );
};

export default Dashboard;