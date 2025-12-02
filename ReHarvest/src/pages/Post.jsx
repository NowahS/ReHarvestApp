import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { db, auth } from "../firebase";
import {doc, updateDoc, arrayUnion} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Post({ id, userId, username, title, content, initialLikes, initialComments, fileUrl, rating = 0, videoUrl}) {
  const [currentRating, setCurrentRating] = useState(rating);
  const[likes, setLikes] = useState(initialLikes || 0);
  const[comments, setComments] = useState(initialComments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const navigate = useNavigate();

  //const handleLike = () => setLikes(likes + 1);
  const handleLike = async () => {
    try{
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {likes: likes + 1});
      setLikes(likes + 1);
    }catch (error){
        console.error("Error updating likes:", error)
    }
  };

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
    const youtubeRegex1 = /youtube\.com\/watch\?v=([^&] +)/;
    const youtubeRegex2 = /youtu\.be\/([^?]+)/;

    let match = url.match(youtubeRegex1);
    if(match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    match = url.match(youtubeRegex2);
    if(match){
      return `https://www.youtube.com/embed/${match[1]}`;
    }

  // Otherwise, assume direct mp4
  return url;
}



  return (
    <div className="post-container mt-4 p-3 border rounded bg-light" style= {{ maxWidth: "750px", margin: "40px auto"}}>
      <h6>
        Posted by {" "}
        <a 
          className="text-primary text-decoration-underline"
          onClick={() => navigate(`/userprofile/${userId}`)}
        >
          @{username}
        </a>
      </h6>
      <h4><b>{title}</b></h4>
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
          {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")|| videoUrl.includes("vimeo") ? (
            <div style={{width: "100%", maxWidth: "800px", margin: "0 auto"}}>
            <div className="ratio ratio-16x9">
            <iframe
            src={convertToEmbedUrl (videoUrl)}
            title="Video post"
            allow= "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{border: 0}}>
            </iframe>
            </div>
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