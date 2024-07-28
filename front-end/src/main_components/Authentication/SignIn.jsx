import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Connecting with the back-end
import axios from "axios";
// Importing files
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import "../../css/authentication-style.css";

let signedInEmail = "";

const SignIn = ({ onSignInSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8228/users/login', {
        email,
        password,
      });

      if (response.status !== 200) {
        document.getElementById("error-input").innerText = "Login failed";
        return;
      }

      signedInEmail = email;
      onSignInSuccess();
      onClose();
    } catch (error) {
      console.error("Error during sign in:", error);
      document.getElementById("error-input").innerText = "Login failed";
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            {showPassword ? < FiEye/> : < FiEyeOff />}
          </button>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
export { signedInEmail};
