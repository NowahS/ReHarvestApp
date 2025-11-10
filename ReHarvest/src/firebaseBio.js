import { db, auth } from "./firebase";
import { collection, addDoc} from "firebase/firestore";
export const editUserBlog = async (userBio, userSocials) => {
    const user = auth.currentUser;

    if (!user) {
        alert("You aren't logged in");
        return;
    }

    const userBlogData = {
        userId: user.uid,
        userBio: userBio,
        userSocials: userSocials
    }
    try {
        await addDoc(collection(db, "userBlogs"), userBlogData);
        alert("User blog edited successfully");
    } 
    catch (error) {
        console.error("Error editing user blog:", error);
        alert("Failed to edit user blog");
    }
};