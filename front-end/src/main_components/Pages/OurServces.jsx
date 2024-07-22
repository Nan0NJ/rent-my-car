import React from 'react';
import './../../css/service-style.css'; 

import Image1 from './../../imgs/image1.png';
import Image2 from './../../imgs/image2.png';

const Services = () => {
  return (
    <div className="services-container">
      <div className="service-card">
        <h3 className="service-title">All Brands</h3>
        <p className="service-text">
          Explore a diverse range of vehicles from all major car brands. With an extensive selection ensuring that you find the perfect match for your travel needs.
        </p>
        <a href="/booking" className="service-link">
          Learn More <span>&rarr;</span>
        </a>
      </div>
      <div className="service-image">
        <img src={Image1} alt="Car interior" />
      </div>
      <div className="service-image">
        <img src={Image2} alt="Car dashboard" />
      </div>
      <div className="service-card">
        <h3 className="service-title">Free Support</h3>
        <p className="service-text">
          Our dedicated support team is here to assist you at every step. From booking your car to managing your rental, addressing all concerns, we provide round-the-clock support to ensure a smooth and hassle-free experience.
        </p>
        <a href="/contact" className="service-link">
          Learn More <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default Services;
