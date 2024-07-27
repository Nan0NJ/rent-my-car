import React, { useState, useEffect} from "react";

// Importing files
import SignIn, { signedInEmail } from "./SignIn";
import SignUp, { signedUpEmail } from "./SignUp";
import AuthDetails from './AuthDetails';

function Authentication() {
    /*
        Using States in order for the User to get correct Interface.
        Depending on the state they are in.
    */
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAuthDetails, setShowAuthDetails] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);

    /*
        Check for an existing JWT token in localStorage on component mount
        Key reason being that the user might have already signed in and closed the tab.
    */
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setJwtToken(storedToken);
            setLoggedIn(true);
            setShowAuthDetails(true);
        }
    }, []);

    /*
        Function: To handle A Successful Sign In
    */
   const handleSignInSuccess = (token) => {
        // We save the JWT Tokem in the localStorage
        localStorage.setItem('jwtToken', token);
        console.log("jwtToken: ", jwtToken);
        setLoggedIn(true);
        setShowSignIn(false);
        setShowSignUp(false);
        setShowAuthDetails(true); // Authentication Details to preview user mail
        console.log("Successfull sign in takeEmail= " + signedInEmail);
        console.log("Current Cars established for renting = LATER ON...");
        console.log("Current Cars established for renting (OWNED - LISTED) = LATER ON...");
        localStorage.setItem('loggedEmail', signedInEmail); // Save the email of the user
    };

    /*
        Function: To handle A Successful Sign Up
    */
    const handleSignUpSuccess = (token) => {
        // We save the JWT Token in the localStorage
        localStorage.setItem('jwtToken', token);
        console.log("handleSignUpSuccess= " + token);
        setLoggedIn(true);
        setShowSignIn(false);
        setShowSignUp(false);
        setShowAuthDetails(true); // Show AuthDetails when the user signs up
        localStorage.setItem('loggedEmail', signedUpEmail);
        //let rentedCars = []; // Fix for later...
    };

    /*
        Function: To handle A Logout
    */
    const handleLogoutClick = () => {
        if (loggedIn) {
            /*
                Remove the JWT Token from the localStorage
                This will log the user out.
            */
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('loggedEmail');
            localStorage.removeItem('loggedClasses');
            localStorage.removeItem('isAdmin');
            setJwtToken(null);
            setLoggedIn(false);
            setShowAuthDetails(false);
            window.location.href = '/'; // We redirect TO HOME PAGE
        } else {
            /* 
                If the user is not logged in, we will show the Sign In form.
            */
            setShowSignIn(true);
            setShowSignUp(false);
        }
    };

    /* 
        Function: To handle the Sign In Click
    */
    const handleSignInClick = () => {
        setShowSignIn(true);
        setShowSignUp(false);
    };
    /*
        Function: To handle the Sign Up Click
    */
    const handleSignUpClick = () => {
        setShowSignIn(false);
        setShowSignUp(true);
    };

    /*
        Function: To handle a click outside of the Forms.
        Then we just close the form.
    */
    const handleOutsideClick = (e) => {
        // If the click is outside of the form, we close it
        if ((showSignIn || showSignUp) && !e.target.closest('.formLOGIN')) {
            setShowSignIn(false);
            setShowSignUp(false);
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
                <>
                  <button onClick={handleSignInClick}>Sign In</button>
                  {/* Comment line below if you want to sign up instructors */}
                  <button onClick={handleSignUpClick}>Sign Up</button>
                  {/*window.location.pathname !== '/admin' && ( LATER ON IF I HAVE ADMIN AUTHENTICATION
                  )*/}
                </>
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
          {showSignUp && (
            <div className="modal">
              <div className='formLOGIN'>
                <SignUp onSignUpSuccess={handleSignUpSuccess} onClose={() => setShowSignUp(false)} />
              </div>
            </div>
          )}
          {showAuthDetails && <AuthDetails loggedIn={loggedIn} />}
        </div>
      );
}

export default Authentication;