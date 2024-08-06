import React, { useState, useEffect } from 'react';

// Importing files
import Cars from './../booking_page_components/CarItems'; // TO CHECK WE NEED THIS DATA
import './../../css/mydashboard-style.css'; 

const Dashboard = () => {
  const approval = localStorage.getItem('approvalStatus');
  const [user, setUser] = useState({
    name: 'TEST FOR NOW',
    email: 'test@test.com',
  });

  const [rentedCars, setRentedCars] = useState([]);
  const [rentHistory, setRentHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching rental history from an API
    const fetchedRentedCars = Cars.filter(car => car.taken);
    const fetchedRentHistory = Cars.filter(car => car.taken);

    setRentedCars(fetchedRentedCars);
    setRentHistory(fetchedRentHistory);
  }, []);

  const addRentedCar = (carId) => {
    const car = Cars.find(car => car.id === carId);
    if (car) {
      setRentedCars([...rentedCars, car]);
      setRentHistory([...rentHistory, car]);
    }
  };

  if (approval === '0' || approval === null) {
    return (
      <div className="awaiting-verification">
        <p>Awaiting Verification, Please be patient!</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="account-info">
        <h2>Account Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      <div className="rented-cars">
        <h2>Rented Cars</h2>
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

      <div className="rent-history">
        <h2>Rent History</h2>
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

      <div className="add-rented-car">
        <h2>Add Rented Car</h2>
        <select onChange={(e) => addRentedCar(parseInt(e.target.value))}>
          <option value="">Select a car to rent</option>
          {Cars.filter(car => !car.taken).map(car => (
            <option key={car.id} value={car.id}>{car.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dashboard;
