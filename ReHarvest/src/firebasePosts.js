import { collection, doc, addDoc, getDoc, updateDoc,serverTimestamp, getDocs, query, orderBy} from "firebase/firestore";
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from "./firebase";
import { updateProfile } from "firebase/auth";

export const getUserData = async (uid) => {
    if (!uid) return null;
    const userDocRef = doc(db, "users", uid);
    const snap = await getDoc(userDocRef);
    const authName = auth.currentUser?.displayName;
    if (snap.exists()) {
        const data = snap.data();

        return {
          ...data,
          displayName: authName || data.username || "Anonymous",
          username: data.username || authName || "Anonymous"
        };
    }
    return null; 
}

export const setUserDisplayName = async (name) => {
  try {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name
    });

    return true;
  } catch (error) {
    console.error("Error updating displayName:", error);
    return false;
  }
};

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
    username: userData?.username || userData?.displayName || "User",
    displayName: userData?.displayName || userData?.username || "User",
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

export const addCommentToPost = async (postId, text) => {
  const user = auth.currentUser;

  if (!user) return null;

  const userData = await getUserData(user.uid);

  const commentData = {
    text,
    userId: user.uid,
    displayName: userData.displayName || userData.username || "User",
    createdAt: serverTimestamp()
  };

  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    await addDoc(commentsRef, commentData);

    return commentData
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
};

export const getComments = async (postId) => {
  const commentsRef = collection(db, "posts", postId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};