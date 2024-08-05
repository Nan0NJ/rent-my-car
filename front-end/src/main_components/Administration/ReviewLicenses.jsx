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

  const handleMatched = (email) => {
    fetch("http://88.200.63.148:8228/users/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          // Optionally, remove the matched user from the local state
          setUsers(users.filter(user => user.email !== email));
        } else {
          alert("Failed to update user approval status");
        }
      })
      .catch(error => {
        console.error("There was an error updating the user approval status!", error);
      });
  };

  const handleUnmatched = (email) => {
    fetch("http://88.200.63.148:8228/users/deleteuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          // Remove the unmatched user from the local state
          setUsers(users.filter(user => user.email !== email));
        } else {
          alert("Failed to delete user");
        }
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
  };

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
            <div className="user-actions">
              <button className="" onClick={() => handleMatched(user.email)}>MATCHED</button>
              <button onClick={() => handleUnmatched(user.email)}>UNMATCHED</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewLicenses;
