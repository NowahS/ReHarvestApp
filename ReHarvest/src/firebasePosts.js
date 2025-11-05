import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";

export const uploadPost = async (title, content) => {
  const user = auth.currentUser;

  if (!user) {
    alert("You aren't logged in");
    return;
  }

  const postData = {
    userId: user.uid,
    title: title,
    createdAt: serverTimestamp(),
  };

  if (content){
    postData.content = content;
  }

  try {
    await addDoc(collection(db, "posts"), postData);
    alert("Post created successfully");
  } 
  catch (error) {
    console.error("Error making post:", error);
    alert("Failed to create post");
  }
};