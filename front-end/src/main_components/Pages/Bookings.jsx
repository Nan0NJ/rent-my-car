import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Importing files
import './../../css/booking-style.css';

// Helper function to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BookingPage = () => {
  const query = useQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: query.get('model') || '',
    minPrice: 0,
    maxPrice: 50000,
    modelYear: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement search logic here using searchTerm and filters
    console.log('Search Term:', searchTerm);
    console.log('Filters:', filters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: Number(value) });
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
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="cabriolet">Cabriolet</option>
              <option value="coupe">Coupe</option>
              <option value="micro">Micro</option>
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
    </div>
  );
};

export default BookingPage;
