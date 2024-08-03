import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import "../../css/authentication-style.css";
import PopupMessage from "./PopupMessage";

let signedUpEmail = "";

const SignUp = ({ onSignUpSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]); // Log the file object to ensure it's being captured
};


const signUp = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('age', age);
  formData.append('image', image);

  for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
  }

  try {
      const response = await fetch('http://88.200.63.148:8228/users/register', {
          method: 'POST',
          body: formData,
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
        <label htmlFor="fileInput" className="filefordriverlicense">Insert Valid Driver's License (Max size: 2KB)</label>
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <button type="submit">Sign Up</button>
      </form>
      <PopupMessage message={error} onClose={closePopup} />
    </div>
  );
};

export default SignUp;
export { signedUpEmail };
