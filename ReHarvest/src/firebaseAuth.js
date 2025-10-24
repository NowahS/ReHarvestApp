import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    createdAt: new Date().toISOString(),
  });

  return user;
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => signOut(auth);