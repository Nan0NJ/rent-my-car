import React, { useState, useEffect } from "react";
import SignIn from "../Authentication/SignIn";
import AuthDetails from "../Authentication/AuthDetails";
import "../../css/authentication-style.css"

function Administration() {
    const [showSignIn, setShowSignIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAuthDetails, setShowAuthDetails] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setLoggedIn(true);
            setShowAuthDetails(true);
        }
    }, []);

    const handleSignInSuccess = (token) => {
        localStorage.setItem('jwtToken', token);
        setLoggedIn(true);
        setShowSignIn(false);
        setShowAuthDetails(true);
    };

    const handleLogoutClick = () => {
        if (loggedIn) {
            localStorage.removeItem('jwtToken');
            setLoggedIn(false);
            setShowAuthDetails(false);
            window.location.href = '/'; 
        } else {
            setShowSignIn(true);
        }
    };

    const handleSignInClick = () => {
        setShowSignIn(true);
    };

    /*
        Function: To handle a click outside of the Forms.
        Then we just close the form.
    */
    const handleOutsideClick = (e) => {
        // If the click is outside of the form, we close it
        if (showSignIn && !e.target.closest('.formLOGIN')) {
            setShowSignIn(false);
        }
    };

    /* 
        Attaching an Event Listener for when the component mounts.
    */
        useEffect(() => {
            document.addEventListener('mousedown', handleOutsideClick);
            
            // Remove the event listener when the component unmounts
            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        },);

    return (
        <div className="authentication-container">
            <div className="authentication-buttons">
                {loggedIn ? (
                    <button className='sign-out' onClick={handleLogoutClick}>Log Out</button>
                ) : (
                    <div className='login-signup'>
                        <button onClick={handleSignInClick}>Admin Sign In</button>
                    </div>
                )}
            </div>
            {showSignIn && (
                <div className="modal">
                    <div className='formLOGIN'>
                        <SignIn onSignInSuccess={handleSignInSuccess} onClose={() => setShowSignIn(false)} />
                    </div>
                </div>
            )}
            {showAuthDetails && <AuthDetails loggedIn={loggedIn} />}
        </div>
    );
}

export default Administration;
