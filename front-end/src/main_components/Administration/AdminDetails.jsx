import React, { useState } from "react";

// Importing files
import ReviewBookings from "./ReviewBookings";
import ReviewLicenses from "./ReviewLicenses";
import "../../css/admindetail-style.css";

const AdminDetails = () => {
  const [view, setView] = useState("main");

  const renderMainButtons = () => (
    <div className="button-container-review">
      <button className="review-button" onClick={() => setView("licenses")}>Review User Licenses</button>
      <button className="review-button" onClick={() => setView("bookings")}>Review Bookings</button>
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

  return (
    <div className="text-details-auth">
      {view === "main" && renderMainButtons()}
      {view === "licenses" && renderUserLicenses()}
      {view === "bookings" && renderBookings()}
    </div>
  );
};

export default AdminDetails;
