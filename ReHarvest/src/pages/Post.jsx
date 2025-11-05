import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Post({ initialLikes, initialComments }) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);

  const handleLike = () => setLikes(likes + 1);

  return (
    <div className="post-container mt-4 p-3 border rounded bg-light">
      <h4>Example Post Title</h4>
      <p>This is an example post content.</p>
      <Button variant="primary" onClick={handleLike}>
        ❤️ Like ({likes})
      </Button>

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
