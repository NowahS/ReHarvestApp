import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const signUp = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      createdAt: serverTimestamp(),
    });

    console.log("Sign up successful")
    return user;
  }
  catch (error){
    console.log("There was a sign up error");
    throw error
  }
};

export const logIn = async (email, password) => {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Log in Successful")
    return user
  }
  catch(error){
    console.log("There was a log in error");
    throw error
  }
};

export const logOut = () => signOut(auth);