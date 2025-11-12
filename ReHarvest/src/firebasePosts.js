import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from "./firebase";

export const uploadPost = async (title, content = "", rating = 0, file = null) => {
  const user = auth.currentUser;

  if (!user) {
    alert("You aren't logged in");
    return;
  }

  const postData = {
    userId: user.uid,
    title: title,
    rating,
    createdAt: serverTimestamp(),
  };

  if (content){
    postData.content = content;
  }

  if (file){
    const fileRef = ref(storage, 'posts/${user.uid}/${file.name}_${serverTimestamp()}');
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    postData.fileUrl = downloadURL;
    postData.fileName = file.name;
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