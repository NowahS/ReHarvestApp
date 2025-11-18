import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { db, auth } from "../firebase";
import {doc, updateDoc, arrayUnion} from "firebase/firestore";

function Post({ id, title, content, initialLikes, initialComments, fileUrl, rating = 0, videoUrl}) {
  const [currentRating, setCurrentRating] = useState(rating);
  const[likes, setLikes] = useState(initialLikes || 0);
  const[comments, setComments] = useState(initialComments || []);
  const [newCommentText, setNewCommentText] = useState("");

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user) {
      alert("You must be logged in to comment.");
      return;
    }
    if (newCommentText.trim() === "") return;
    const commentData = {
      text: newCommentText.trim(),
      userId: user.uid,
    }
    try{
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        comments: arrayUnion(commentData),
      })
      setComments([...comments, commentData]);
      setNewCommentText("");
    } 
    catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  /*helper function*/
  function convertToEmbedUrl(url) {
  // YouTube full URL
  if (url.includes("youtube.com/watch")) {
    const videoId = url.split("v=")[1].split("&")[0]; // strip extra params
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // YouTube short URL
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Vimeo URL
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("/").pop().split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  // Otherwise, assume direct mp4
  return url;
}



  return (
    <div className="post-container mt-4 p-3 border rounded bg-light">
      <h4>{title}</h4>
      <p>{content}</p>

      {/* Image Display */}
      {fileUrl && (
        <div className="my-3">
          <img 
            src={fileUrl} 
            alt="Post attachment"
            style={{ maxWidth: "250px", width: "100%", height: "auto"}}
          />
        </div>
      )}

      {/*Video Embed code */}
      {videoUrl && (
        <div className="video-container my-3">
          {videoUrl.includes("youtube") || videoUrl.includes("vimeo") ? (
            <div className="ratio ratio-16x9">
            <iframe
            /*src={convertToEmbedUrl (videoUrl)}*/
             src="https://www.youtube.com/embed/RaLzxZryEoA?si=ncMu-q3RqTbCojc0"
            title="Video post"
            allow= "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{border: 0}}>
            </iframe>
            </div>
          ) : (
            <video className= "w-100" controls style={{maxHeight: '500px'}}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

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
          comments.map((c, i) => (
          //<p key={i}>• {c}</p>)
          <p key={i}>
            • User ({c.userId.substring(0, 4)}...): {c.text}
          </p>
          ))
        )}
      </div>

      <div className="mt-3">
        <h6>Add Comment</h6>
        <form onSubmit={handleAddComment}>
          <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write your comment..."
          />
          <Button variant="success" type="submit" size="sm">
            Post Comment
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Post;