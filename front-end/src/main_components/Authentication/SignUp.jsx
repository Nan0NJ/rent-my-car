import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Importing files
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import "../../css/authentication-style.css";

let signedUpEmail = null;

// MOCH BUILD FOR SIGNING UP USERS FIXXX LATER WITH DB
const mockUsers = {
  "admin@example.com": { password: "adminpass", isAdmin: true },
  "user@example.com": { password: "userpass", isAdmin: false }
};

const SignUp = ({ onSignUpSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      if (mockUsers[email]) {
        document.getElementById("error-input").innerText = "Email already in use";
        return;
      }

      if (password.length < 6) {
        console.log("Password is too weak");
        return;
      }

      const isAdminPath = location.pathname === "/admin";
      mockUsers[email] = {
        password: password,
        isAdmin: isAdminPath
      };

      signedUpEmail = email;
      onSignUpSuccess();
      onClose();
    } catch (error) {
      console.error("Error during sign up:", error);
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
