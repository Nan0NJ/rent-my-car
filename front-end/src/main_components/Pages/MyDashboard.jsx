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
  const [rentedCars, setRentedCars] = useState([]);
  const [rentHistory, setRentHistory] = useState([]);
  const [cars, setCars] = useState([]);
  const [showRentedCars, setShowRentedCars] = useState(false);
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

    // Fetch rented cars and rent history
    fetch('http://88.200.63.148:8228/users/userdetails')
      .then(response => response.json())
      .then(data => {
        console.log('Rented cars data:', data); // Log the response data
        const rented = data.filter(car => car.taken);
        setRentedCars(rented);
        setRentHistory(rented);
      })
      .catch(error => console.error('Error fetching rented cars:', error));

    // Fetch all cars (if needed for the "Add Rented Car" functionality)
    fetch('/api/all-cars')
      .then(response => response.json())
      .then(data => {
        console.log('All cars data:', data); // Log the response data
        setCars(data);
      })
      .catch(error => console.error('Error fetching all cars:', error));
  }, [storedEmail]);

  const addRentedCar = (carId) => {
    const car = cars.find(car => car.id === carId);
    if (!car) return;

    fetch(`/api/rent-car/${carId}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        setRentedCars([...rentedCars, car]);
        setRentHistory([...rentHistory, car]);
      })
      .catch(error => console.error('Error adding rented car:', error));
  };

  const handleAddCarSuccess = (newCar) => {
    setCars([...cars, newCar]);
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
          <h2 onClick={() => setShowRentedCars(!showRentedCars)}>
            Rented Cars 
            <button className="accordion-toggle">
              {showRentedCars ? '▲' : '▼'}
            </button>
          </h2>
          {showRentedCars && (
            <div className="accordion-content">
              {rentedCars.length > 0 ? (
                rentedCars.map(car => (
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
                <p>No rented cars</p>
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
