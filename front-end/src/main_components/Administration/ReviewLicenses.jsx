import React, { useEffect, useState } from "react";

const ReviewLicenses = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://88.200.63.148:8228/users/unapproved")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div>
      <h2>User Licenses</h2>
      <p>Details about user licenses are given below. (Assert and Review them)</p>
      <div className="users-container">
        {users.map(user => (
          <div key={user.email} className="user-card">
            {user.image && (
              <img src={`data:image/jpeg;base64,${user.image}`} alt={`${user.fullname}'s avatar`} />
            )}
            <h3>{user.fullname}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewLicenses;
