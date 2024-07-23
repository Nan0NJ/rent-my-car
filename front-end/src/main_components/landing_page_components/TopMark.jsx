import React, { useEffect, useState } from 'react';

// Importing the files
import './../../css/topmark-style.css';
import Vroom from './../../imgs/Vroom.png';

const textArray = ["Near You...", "Used Cars...", "Any Models...", "Any Motors...", "All Prices..."];

const TopMark = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    
    // Using useEffect to change the text every 3 seconds
    // Timer is set to 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentTextIndex(prevIndex => (prevIndex + 1) % textArray.length);
          setFadeIn(true);
        }, 1000);
      }, 3000); 
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="top-categories">
        <h1 className="titleTop">Top Categories</h1>
        <p className="subtitleTop" style={{ opacity: fadeIn ? 1 : 0 }}>
          {textArray[currentTextIndex]}
        </p>
        <hr className="lineBelowSubtitleTop" />
        <div className="background-container">
          <img src={Vroom} alt="TopMark-Background" className="background-image" />
          <div className="overlay">
            <h2 className="overlay-titleTop">Search For Your Desire</h2>
            <a href="/booking" className="overlay-button">
              Find Vehicle
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default TopMark;