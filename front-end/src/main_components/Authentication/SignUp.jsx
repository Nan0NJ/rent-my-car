import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// Connecting with the back-end
import axios from "axios";
// Importing files
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import "../../css/authentication-style.css";

let signedUpEmail = "";

const SignUp = ({ onSignUpSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const location = useLocation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8228/users/register', {
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
        document.getElementById("error-input").innerText = "Registration failed";
        return;
      }
  
      signedUpEmail = email;
      onSignUpSuccess();
      onClose();
    } catch (error) {
      console.error("Error during sign up:", error);
      document.getElementById("error-input").innerText = "Registration failed";
    }
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
        <span id="error-input"></span>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
export { signedUpEmail };
