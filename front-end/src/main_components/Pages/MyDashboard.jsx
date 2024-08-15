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
  const [rentHistory, setRentHistory] = useState([]);
  const [cars, setCars] = useState([]);
  const [showPublishedCars, setShowPublishedCars] = useState(false);
  const [showRentHistory, setShowRentHistory] = useState(false);
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

    // Fetch all cars (if needed for the "Add Rented Car" functionality)
    fetch('/api/all-cars')
      .then(response => response.json())
      .then(data => {
        console.log('All cars data:', data); // Log the response data
        setCars(data);
      })
      .catch(error => console.error('Error fetching all cars:', error));
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
                    {/* Ensure the correct construction of the data URL for the image */}
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

        <div className="accordion-section">
          <h2 onClick={() => setShowRentHistory(!showRentHistory)}>
            Rent History 
            <button className="accordion-toggle">
              {showRentHistory ? '▲' : '▼'}
            </button>
          </h2>
          {showRentHistory && (
            <div className="accordion-content">
              {rentHistory.length > 0 ? (
                rentHistory.map(car => (
                  <div key={car.id} className="car-item">
                    <img src={car.image || ''} alt={car.name} className="car-img" />
                    <div className="car-info">
                      <h3>{car.name}</h3>
                      <p>Category: {car.category}</p>
                      <p>Price: {car.price} €</p>
                      <p>Model Year: {car.modelYear}</p>
                      <p>Status: {car.taken ? 'Taken' : 'Available'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No rent history</p>
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