import React, { useEffect, useRef } from 'react';
import './../../css/contactowner-style.css';

const ContactOwner = ({ ownerEmail, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="formLOGIN" ref={modalRef}>
        <button className="close-buttonCONTACT" onClick={onClose}>×</button>
        <h2 className='contactOwner-h2'>Contact Information:</h2>
        <p className='contactOwner-p'>You can contact the car owner using the following email address:</p>
        <div className="email-display">{ownerEmail}</div>
      </div>
    </div>
  );
};

export default ContactOwner;