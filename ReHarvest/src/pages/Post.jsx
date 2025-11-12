import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { db } from "../firebase";
import {doc, updateDoc} from "firebase/firestore";

function Post({ id, title, content, initialLikes, initialComments, rating = 0 }) {
  const [currentRating, setCurrentRating] = useState(rating);
  const[likes, setLikes] = useState(initialLikes || 0);
  const[comments, setComments] = useState(initialComments || []);

  const handleLike = () => setLikes(likes + 1);
  const handleRating = async (newRating) => {
    setCurrentRating(newRating);
    try{
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {rating: newRating});
    } catch (error){
      console.error("Error upadting rating:", error);
    }
  };

  return (
    <div className="post-container mt-4 p-3 border rounded bg-light">
      <h4>{title}</h4>
      <p>{content}</p>
      <Button variant="primary" onClick={handleLike}>
        ❤️ Like ({likes})
      </Button>

       <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{
              cursor: "pointer",
              color: star <= currentRating ? "#FFD700" : "#ccc",
              fontSize: "1.5rem",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <div className="mt-3">
        <h6>Comments:</h6>
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((c, i) => <p key={i}>• {c}</p>)
        )}
      </div>
    </div>
  );
}

export default Post;
