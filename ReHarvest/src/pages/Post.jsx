import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { db, auth } from "../firebase";
import {doc, updateDoc, onSnapshot, arrayUnion, collection, query, orderBy} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { addCommentToPost } from "../firebasePosts";

function Post({ id, userId, username, title, content, initialLikes, initialComments, fileUrl, rating = 0, videoUrl}) {
  const [currentRating, setCurrentRating] = useState(rating);
  const[likes, setLikes] = useState(initialLikes || 0);
  const[comments, setComments] = useState(initialComments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const commentsRef = collection(db, "posts", id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsub();
  }, [id]);

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
    if(!auth.currentUser) {
      alert("You must be logged in to comment.");
      return;
    }
    if (newCommentText.trim() === "") return;
    const added = await addCommentToPost(id, newCommentText.trim());
    if (added) {
      setNewCommentText("");
    }
  };


  /*helper function*/
  function convertToEmbedUrl(url) {
    const youtubeRegex1 = /youtube\.com\/watch\?v=([^&]+)/;
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
        {comments.length === 0}
        {comments.map((c, i) => (
          <p key={i}>
            • <b>{c.displayName}</b>: {c.text}
          </p>
        ))}
      </div>
      
      <div className="mt-3">
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write your comment..."
          className="form-control mb-2"
          />
          <Button variant="success" type="submit">
            Post Comment
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Post;