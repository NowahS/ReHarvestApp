import { collection, doc, addDoc, getDoc, serverTimestamp} from "firebase/firestore";
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from "./firebase";
export const getUserData = async (uid) => {
    if (!uid) return null;
    const userDocRef = doc(db, "users", uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
        return snap.data();
    }
    return null; 
}
export const uploadPost = async (title, content = "", videoUrl = "", rating = 0, file = null, diet = "") => {
  const user = auth.currentUser;

  if (!user) {
    alert("You aren't logged in");
    return;
  }
  const userData = await getUserData(user.uid);
  const username = userData?.username || "None";

  const postData = {
    userId: user.uid,
    username,
    title: title,
    rating,
    diet,
    comments: [],
    likes: 0,
    createdAt: serverTimestamp(),
  };

  if (content){
    postData.content = content;
  }

  if (file){
    const fileRef = ref(storage, `posts/${user.uid}/${file.name}_${Date.now()}`);
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