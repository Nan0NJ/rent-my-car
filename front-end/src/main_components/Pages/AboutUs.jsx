import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

// Import
import "./../../css/aboutus-style.css";

function About() {
    // Use: To scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);
    return (
        <div className="about-us-container">
            <div className="about-header">
                <h1>About Our Car Rental Platform</h1>
                <p>Welcome to our innovative car rental community!</p>
            </div>

            <div className="about-text">
                <p>
                    In a rapidly changing world, where mobility and flexibility are critical, our car rental service provides the freedom to travel without the burden of long-term ownership. Whether for a vacation adventure, a business trip, or daily convenience, we offer a versatile and accessible solution to meet modern living demands.
                </p>
                <h5>Join us and explore a diverse, accessible car rental marketplace.</h5>
                <Link to="/booking" className="button">Explore Our Listings</Link>
            </div>

            <div className="fun-facts">
                <h2>Why Choose Us?</h2>
                <div className="fact">
                    <h3>Mobility and Flexibility</h3>
                    <p>We provide over 100 car models to choose from, ensuring you find the perfect vehicle for your needs at any time.</p>
                </div>

                <div className="fact">
                    <h3>Innovative Community</h3>
                    <p>Our platform connects car owners and renters, expanding the available options and promoting community-based mobility.</p>
                </div>

                <div className="fact">
                    <h3>Reliable and Secure</h3>
                    <p>With trustworthy authentication, document verification, and integrated insurance options, we ensure a safe and trustworthy rental experience.</p>
                </div>
                <div className="additional-info">
                <h2>Our Mission</h2>
                <p>
                    We aim to address the challenges of limited car rental options by connecting car owners and renters, promoting seamless access to transportation in small cities and less populated areas.
                </p>
            </div>
            
            </div>
        </div>
        
    );
}

export default About;
