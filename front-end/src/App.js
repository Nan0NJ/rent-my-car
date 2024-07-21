import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing files
import Navbar from './main_components/NavigationBar/Navbar';
import Home from './main_components/Pages/HomePage';
import About from './main_components/Pages/AboutUs';
import Services from './main_components/Pages/OurServces'; 
import Contact from './main_components/Pages/ContactUs';
import Booking from './main_components/Pages/Bookings';
import Dashboard from './main_components/Pages/MyDashboard';
export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes */}
        </Routes>
      </div>
    </Router>
  );
}