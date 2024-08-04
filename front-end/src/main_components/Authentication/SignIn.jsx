import React, { useState } from "react";

// Importing files
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import "../../css/authentication-style.css";
import PopupMessage from "./PopupMessage";

let signedInEmail = "";

const SignIn = ({ onSignInSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://88.200.63.148:8228/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        setError("Login failed");
        return;
      }

      const result = await response.json();
      signedInEmail = email;

      // Store the JWT token and approval status
      localStorage.setItem('jwtToken', result.token);
      localStorage.setItem('approvalStatus', result.approvalStatus);
      localStorage.setItem('fullname', result.user.fullname);
      console.log("The status is = " + localStorage.getItem('approvalStatus'));

      onSignInSuccess();
      onClose();
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("Login failed");
    }
  };

  const closePopup = () => {
    setError("");
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
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
        <button type="submit">Log In</button>
      </form>
      <PopupMessage message={error} onClose={closePopup} />
    </div>
  );
};

export default SignIn;
export { signedInEmail };