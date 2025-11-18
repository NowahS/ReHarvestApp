<<<<<<< HEAD
import { collection, addDoc, getDoc, serverTimestamp} from "firebase/firestore";
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from "./firebase";

export const uploadPost = async (title, content = "", videoUrl = "", rating = 0, file = null, diet = "") => {
=======
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from "./firebase";

export const uploadPost = async (title, content = "", rating = 0, videoUrl = "", file = null) => {
>>>>>>> 90d02c0d45ef3cacc512804346e6d341b72e19c4
  const user = auth.currentUser;

  if (!user) {
    alert("You aren't logged in");
    return;
  }

  const postData = {
    userId: user.uid,
    title: title,
    rating,
    diet,
    createdAt: serverTimestamp(),
  };

  if (content){
    postData.content = content;
  }

  if (file){
<<<<<<< HEAD
    const fileRef = ref(storage, `posts/${user.uid}/${file.name}_${Date.now()}`);
=======
    const fileRef = ref(storage, 'posts/${user.uid}/${file.name}_${serverTimestamp()}');
>>>>>>> 90d02c0d45ef3cacc512804346e6d341b72e19c4
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    postData.fileUrl = downloadURL;
    postData.fileName = file.name;
  }
  if (videoUrl){
    postData.videoUrl = videoUrl;
  }

  try {
    const docRef =await addDoc(collection(db, "posts"), postData);
    const docSnap = await getDoc(docRef);
    alert("Post created successfully");
    return {id: docRef.id, ...docSnap.data()};
  } 
  catch (error) {
    console.error("Error making post:", error);
    alert("Failed to create post");
  }
};