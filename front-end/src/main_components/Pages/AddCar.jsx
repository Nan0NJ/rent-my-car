import React, { useState, useEffect, useRef } from 'react';
import '../../css/addcar-style.css'; // Import the new CSS file

const categories = ['Sedan', 'Cabriolet', 'Coupe', 'SUV', 'Micro'];

const AddCar = ({ onAddCarSuccess, onClose }) => {
  const [carName, setCarName] = useState('');
  const [category, setCategory] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [carInfo, setCarInfo] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [mileagePassed, setMileagePassed] = useState('');
  const [isDamaged, setIsDamaged] = useState(false);
  const [greenCard, setGreenCard] = useState(null);
  const [carImage, setCarImage] = useState(null);
  const [price, setPrice] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  const fetchCarPrice = async (carName) => {
    try {
      const response = await fetch(`http://88.200.63.148:8228/model_cars/car-price?name=${carName}`);
      if (response.ok) {
        const data = await response.json();
        return data.price;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching car price:', error);
      return null;
    }
  };

  const calculateDailyRate = async (category, modelYear, mileage, isDamaged, carName) => {
    let baseRate;

    // Fetch the car full price from the database
    const carPrice = await fetchCarPrice(carName);

    if (carPrice) {
      baseRate = carPrice / 365; // Assuming daily rate is 1/365th of the car's price
    } else {
      // Set default base daily rate according to the category if car price is not found
      switch (category) {
        case 'Sedan':
          baseRate = 50;
          break;
        case 'Cabriolet':
          baseRate = 70;
          break;
        case 'Coupe':
          baseRate = 60;
          break;
        case 'SUV':
          baseRate = 80;
          break;
        case 'Micro':
          baseRate = 40;
          break;
        default:
          baseRate = 50;
      }
    }

    // Adjust rate based on model year
    const currentYear = new Date().getFullYear();
    const age = currentYear - modelYear;
    baseRate -= age * 0.5; // Depreciate $0.5 per year

    // Adjust rate based on mileage
    if (mileage > 100000) {
      baseRate -= 5;
    } else if (mileage > 50000) {
      baseRate -= 2;
    }

    // Adjust rate if the car is damaged
    if (isDamaged) {
      baseRate -= 5;
    }

    // Ensure rate doesn't go below zero
    return Math.max(baseRate, 0);
  };

  useEffect(() => {
    const updateSuggestedPrice = async () => {
      if (category && modelYear && mileagePassed !== '' && isDamaged !== '' && carName) {
        const suggested = await calculateDailyRate(category, parseInt(modelYear), parseInt(mileagePassed), isDamaged, carName);
        setSuggestedPrice(suggested);
      }
    };
    updateSuggestedPrice();
  }, [category, modelYear, mileagePassed, isDamaged, carName]);

  const handleAddCar = async (e) => {
    e.preventDefault();

    // Get the user's email from localStorage
    const userEmail = localStorage.getItem('loggedEmail');

    // Generate a unique ID for the car based on the car name and user's email
    const carId = `${carName}_${userEmail}`;

    try {
      const formData = new FormData();
      formData.append('car_id', carId);
      formData.append('car_name', carName);
      formData.append('car_category', category);
      formData.append('car_owner', userEmail);
      formData.append('model_year', modelYear);
      formData.append('car_information', carInfo);
      formData.append('car_location', locationCity);
      formData.append('car_mileage', mileagePassed);
      formData.append('is_damaged', isDamaged ? 'true' : 'false');
      formData.append('green_card', greenCard);
      formData.append('car_img', carImage);
      formData.append('price', price);

      const response = await fetch('http://88.200.63.148:8228/cars/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setError('Failed to add car');
        return;
      }

      const result = await response.json();
      onAddCarSuccess(result);
      onClose();
    } catch (error) {
      console.error('Error adding car:', error);
      setError('Failed to add car');
    }
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="add-car-container" ref={modalRef}>
      <form onSubmit={handleAddCar}>
        <h1>Publish Your Vehicle</h1>
        <input
          type="text"
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Model Year"
          value={modelYear}
          onChange={(e) => setModelYear(e.target.value)}
          min="1970"
          max={new Date().getFullYear()}
          required
        />
        <textarea
          placeholder="Information on Car"
          value={carInfo}
          onChange={(e) => setCarInfo(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Location City"
          value={locationCity}
          onChange={(e) => setLocationCity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Mileage Passed (in km)"
          value={mileagePassed}
          onChange={(e) => setMileagePassed(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isDamaged}
            onChange={(e) => setIsDamaged(e.target.checked)}
          />
          Damaged
        </label>
        <p>Upload Green Card:</p>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setGreenCard)}
          required
        />
        <p>Upload Car Image:</p>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setCarImage)}
          required
        />
        <p>Set Price:</p>
        <input
          type="number"
          placeholder={`Suggested Daily Rate: ${suggestedPrice ? `$${suggestedPrice}` : ''}`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Car</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddCar;
