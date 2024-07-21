import React from 'react';
import './../../css/footer-style.css'; // Make sure to create this CSS file
import CarImage from './../../imgs/footer_car.png'; // Adjust the path to your image

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={CarImage} alt="Car" className="footer-car-image" />
                </div>
                <div className="footer-center">
                    <p className="footer-sentence">Rent My Car - Your Trusted Car Rental Service</p>
                </div>
                <div className="footer-right">
                    <p className="footer-contact">
                        <strong>(402) 710-80085</strong><br />
                        <a href="mailto:info@rentmycar.co.mk" className="footer-email">info@rentmycar.co.mk</a><br />
                        Palace Emanuel Cuckov,<br />
                        Jordan Mijalkov Str, Skopje 1000
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
