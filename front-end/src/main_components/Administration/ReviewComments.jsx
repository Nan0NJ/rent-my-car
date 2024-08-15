import React, { useEffect, useState } from "react";

const ReviewComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://88.200.63.148:8228/reviews/all")
      .then(response => response.json())
      .then(data => {
        setComments(data);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });
  }, []);

  const handleDelete = async (review_id) => {
    try {
        const response = await fetch('http://88.200.63.148:8228/reviews/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ review_id }), // Passing the review_id correctly
        });

        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }

        const result = await response.json();
        alert(result.message);
        setComments(comments.filter(comment => comment.review_id !== review_id)); // Remove the deleted comment from the state
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Error: Failed to delete comment');
    }
  };

  return (
    <div>
      <h2>Moderate Comments</h2>
      <p>Below are the comments left by users. You can review and remove deemed inappropriate ones.</p>
      <div className="users-container">
        {comments.map(comment => (
          <div key={comment.review_id} className="user-card">
            <h3>{comment.user_fullname}</h3>
            <p>{comment.review_text}</p>
            <small>Posted on: {new Date(comment.review_date).toLocaleString()}</small>
            <div className="user-actions">
              <button onClick={() => handleDelete(comment.review_id)}>Delete Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewComments;