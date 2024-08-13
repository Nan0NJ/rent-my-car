import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './../../css/booking-style.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BookingPage = () => {
  const approval = localStorage.getItem('approvalStatus');
  const query = useQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: query.get('model') || '',
    minPrice: 0,
    maxPrice: 50000,
    modelYear: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://88.200.63.148:8228/cars/all');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          console.error('Failed to fetch cars');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterCars = useCallback(() => {
    const filteredCars = cars.filter((car) => {
      return (
        car.car_approved === 1 && // Only show approved cars
        car.car_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filters.category || car.car_category === filters.category) &&
        (!filters.modelYear || car.model_year.toString() === filters.modelYear)
      );
    });
    setFilteredCars(filteredCars);
  }, [filters, searchTerm, cars]);

  useEffect(() => {
    filterCars();
  }, [filters, searchTerm, cars, filterCars]);

  const handleSubmit = (event) => {
    event.preventDefault();
    filterCars();
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: Number(value) }));
  };

  return (
    <div className="booking-page">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001a1.007 1.007 0 0 0 .101.102l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.102-.101zm-5.442 1.398a5.5 5.5 0 1 1 7.778-7.778 5.5 5.5 0 0 1-7.778 7.778z"
              />
            </svg>
          </button>
        </div>
        <button type="button" className="toggle-filters-button" onClick={toggleFilters}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        {showFilters && (
          <div className="filters">
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="filter-select"
            >
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="Cabriolet">Cabriolet</option>
              <option value="Coupe">Coupe</option>
              <option value="SUV">SUV</option>
              <option value="Micro">Micro</option>
            </select>
            <div className="price-filter">
              <label>Min Price: {filters.minPrice} €</label>
              <input
                type="range"
                name="minPrice"
                min="0"
                max="50000"
                value={filters.minPrice}
                onChange={handlePriceChange}
                className="price-slider"
              />
              <label>Max Price: {filters.maxPrice} €</label>
              <input
                type="range"
                name="maxPrice"
                min="0"
                max="50000"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                className="price-slider"
              />
            </div>
            <input
              type="number"
              name="modelYear"
              value={filters.modelYear}
              onChange={handleInputChange}
              className="filter-input"
              placeholder="Enter model year (1970-2024)"
              min="1970"
              max="2024"
            />
          </div>
        )}
      </form>

      <div className="car-results">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => {
            const carId = `${car.car_name}_${car.car_owner}`; // Create the car_id by concatenating car_name and car_owner
            return (
              <div key={carId}>
                {approval === '1' ? (
                  <Link to={`/car/${carId}`} className="car-item">
                    <img src={`data:image/jpeg;base64,${car.car_img}`} alt={car.car_name} className="car-img" />
                    <div className="car-info">
                      <h3>{car.car_name}</h3>
                      <p>Category: {car.car_category}</p>
                      <p>Location: {car.car_location}</p>
                      <p>Information: {car.car_information}</p>
                      <p>Price: {car.car_price} €</p>
                    </div>
                  </Link>
                ) : (
                  <div className="car-item">
                    <img src={`data:image/jpeg;base64,${car.car_img}`} alt={car.car_name} className="car-img" />
                    <div className="car-info">
                      <h3>{car.car_name}</h3>
                      <p>Category: {car.car_category}</p>
                      <p>Location: {car.car_location}</p>
                      <p>Information: {car.car_information}</p>
                      <p>Price: {car.car_price} €</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
