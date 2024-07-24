import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Importing files
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import "../../css/authentication-style.css";

// MOCH BUILD FOR GETTING A SIGNED USER FIXXX LATER WITH DB
let signedInEmail = null;
let loggedClasses = {};
let loggedAttendees = {};

const mockUsers = {
  "admin@example.com": {
    password: "adminpass",
    isAdmin: true,
    classes: {
      "Math 101": ["Alice", "Bob"],
      "Science 102": ["Charlie", "Dave"]
    }
  },
  "user@example.com": {
    password: "userpass",
    isAdmin: false,
    classes: {}
  }
};

const SignIn = ({ onSignInSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname === "/admin";

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signIn = async (e) => {
    e.preventDefault();

    try {
      if (mockUsers[email] && mockUsers[email].password === password) {
        signedInEmail = email;

        if (isAdminPath && mockUsers[email].isAdmin) {
          const classesData = fetchInstructorClasses(signedInEmail);
          if (classesData) {
            const { classNames, attendees } = classesData;
            loggedClasses = classNames;
            loggedAttendees = attendees;
            localStorage.setItem('isAdmin', 1);
            navigate('/adminDetails');
          }
        } else {
          localStorage.setItem('isAdmin', 0);
        }

        onSignInSuccess();
        onClose();
      } else {
        console.log("Invalid email or password.");
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const fetchInstructorClasses = (signedInEmail) => {
    try {
      const userClasses = mockUsers[signedInEmail].classes;
      const classNames = Object.keys(userClasses);
      const attendees = userClasses;

      console.log("Fetched Class Names:", classNames);
      console.log("Attendees for classes:", attendees);

      localStorage.setItem('loggedClasses', JSON.stringify(classNames));
      localStorage.setItem('loggedAttendees', JSON.stringify(attendees));

      return { classNames, attendees };
    } catch (error) {
      console.error("Error fetching matching classes:", error);
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
export { signedInEmail, loggedClasses, loggedAttendees };
