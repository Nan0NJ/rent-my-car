import React from 'react';

// Importing files
import "../../css/popup-style.css";

const PopupMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="popup">
      <div className="popup-inner">
        <span className="popup-close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopupMessage;
