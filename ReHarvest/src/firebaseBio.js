import { db, auth } from "./firebase";
import { setDoc, getDoc, doc} from "firebase/firestore";
export const getUserData = async (uid) => {
    if (!uid) return null;
    const userDocRef = doc(db, "users", uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
        return snap.data();
    }
    return null; 
}
export const editUserBlog = async (username, userBio, userSocials) => {
    const user = auth.currentUser;

    if (!user) {
        alert("You aren't logged in");
        return;
    }
    const userBlog = doc(db, "userBlogs", user.uid);
    try {
        await setDoc(userBlog, {username, userBio, userSocials}, {merge: true});
        alert("User blog edited successfully");
    } 
    catch (error) {
        console.error("Error editing user blog:", error);
        alert("Failed to edit user blog");
    }
};
export const getUserBlog = async (uid) => {
    if (!uid){
       return null;
   }
   const userBlog = doc(db, "userBlogs", uid);
   const snap = await getDoc(userBlog);

   if (snap.exists()){
        return snap.data();
   }
   else {
        const userData = await getUserData(uid);
        const userUsername = userData?.username || "";
        return { username: userUsername, userBio: "", userSocials: "" };
   }
}