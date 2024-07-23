import React, {useEffect} from 'react';

import './../../css/contactus-style.css'; 
import Email from './../../imgs/email.png';
import Phone from './../../imgs/phone.png';
import Location from './../../imgs/location.png';
import Shape from './../../imgs/shape.png';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <div className="container">
      <span className="big-circle"></span>
      <img src={Shape} className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Contact Us!</h3>
          <p className="text">
          We are here to answer any questions you may have about our car rental services. Reach out to us and we'll respond as soon as we can.
          </p>

          <div className="info">
            <div className="information">
              <img src={Location} className="icon" alt="" />
              <p>Jordan Mijalkov Street, SK 1000</p>
            </div>
            <div className="information">
              <img src={Email} className="icon" alt="" />
              <p>contactservice@rentmycar.co.mk</p>
            </div>
            <div className="information">
              <img src={Phone} className="icon" alt="" />
              <p>(402) 710-80085</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="index.html" autocomplete="off">
            <h3 className="title">Give Feedback</h3>
            <div className="input-container">
              <input type="text" name="name" className="input" placeholder='Username'/>
              <label htmlFor="name"></label>
              <span>Username</span>
            </div>
            <div className="input-container">
              <input type="email" name="email" className="input" placeholder='Email'/>
              <label htmlFor="email"></label>
              <span>Email</span>
            </div>
            <div className="input-container">
              <input type="tel" name="phone" className="input" placeholder='Phone'/>
              <label htmlFor="phone"></label>
              <span>Phone</span>
            </div>
            <div className="input-container textarea">
              <textarea name="message" className="input" placeholder='Give us Feedback...'></textarea>
              <label htmlFor="message"></label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

