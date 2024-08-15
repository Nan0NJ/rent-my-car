import React, { useState, useEffect } from "react";

// Importing files
import ReviewBookings from "./ReviewBookings";
import ReviewLicenses from "./ReviewLicenses";
import ReviewComments from "./ReviewComments";
import "../../css/admindetail-style.css";

const AdminDetails = () => {
  const [view, setView] = useState("main");
  const [adminApproved, setAdminApproved] = useState(false);

  useEffect(() => {
    const adminEmail = localStorage.getItem('loggedEmail');

    const checkAdminEmail = async (email) => {
      try {
        const response = await fetch('http://88.200.63.148:8228/admins/checkemail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();
        if (result.exists) {
          setAdminApproved(true);
        } else {
          setAdminApproved(false);
        }
      } catch (error) {
        console.error("Error checking email:", error);
        setAdminApproved(false);
      }
    };

    if (adminEmail) {
      checkAdminEmail(adminEmail);
    }
  }, []);

  const renderMainButtons = () => (
    <div className="button-container-review">
      <button 
        className="review-button" 
        onClick={() => setView("licenses")} 
        disabled={!adminApproved} // Disables the button if admin is not approved
      >
        Review User Licenses
      </button>
      <button 
        className="review-button" 
        onClick={() => setView("bookings")} 
        disabled={!adminApproved} // Disables the button if admin is not approved
      >
        Review Bookings
      </button>
      <button 
        className="review-button" 
        onClick={() => setView("comments")} 
        disabled={!adminApproved} // Disables the button if admin is not approved
      >
        Review Comments
      </button>
    </div>
  );

  const renderUserLicenses = () => (
    <div>
      <button className="back-button" onClick={() => setView("main")}>Back</button>
      <ReviewLicenses />
    </div>
  );

  const renderBookings = () => (
    <div>
      <button className="back-button" onClick={() => setView("main")}>Back</button>
      <ReviewBookings />
    </div>
  );

  const renderComments = () => (
    <div>
      <button className="back-button" onClick={() => setView("main")}>Back</button>
      <ReviewComments />
    </div>
  );

  return (
    <div className="text-details-auth">
      {view === "main" && renderMainButtons()}
      {view === "licenses" && renderUserLicenses()}
      {view === "bookings" && renderBookings()}
      {view === "comments" && renderComments()}
    </div>
  );
};

export default AdminDetails;
