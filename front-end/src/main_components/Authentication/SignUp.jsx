import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Importing files
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import "../../css/authentication-style.css";
import PopupMessage from "./PopupMessage";

let signedUpEmail = "";

const SignUp = ({ onSignUpSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://88.200.63.148:8228/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          age,
        }),
      });
  
      if (!response.ok) {
        setError("Registration failed");
        return;
      }
  
      signedUpEmail = email;
      onSignUpSuccess();
      onClose();
    } catch (error) {
      console.error("Error during sign up:", error);
      setError("Registration failed");
    }
  };

  const closePopup = () => {
    setError("");
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp} className="form-overlay">
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            type="button"
            className="show-password-button"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <PopupMessage message={error} onClose={closePopup} />
    </div>
  );
};

export default SignUp;
export { signedUpEmail };