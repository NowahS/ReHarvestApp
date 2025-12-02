import { collection, doc, addDoc, getDocs, setDoc, query, orderBy, where, serverTimestamp} from "firebase/firestore";
import { db, auth} from "./firebase";
export const startConversation = async(userId, otherUserId) => {
    const user = auth.currentUser;
    if (!user) {
        alert("You aren't logged in");
        return;
    }
    const convoRef = collection(db, "conversations");
    const q = query(convoRef, where("participants", "array-contains", userId));
    const convoSnap = await getDocs(q);

    let existingConvo = null;

    convoSnap.forEach(doc => {
        const participants = doc.data().participants;
        if (participants.includes(otherUserId)){
            existingConvo = doc.id;
        }
    })
    if (existingConvo){
        return existingConvo;
    }

    const newConvo = await addDoc(collection(db, "conversations"), {
        participants: [userId, otherUserId],
        createdAt: serverTimestamp()
    });
    return newConvo.id;
}
export const sendMessage = async(convoId, senderId, message) => {
    const messagesRef = collection(db, "conversations", convoId, "messages");
    await addDoc(messagesRef, {
        senderId,
        text: message,
        timestamp: serverTimestamp(),
    });
}
export const getConversation = async(convoId) =>{
    const messagesRef = collection(db, "conversations", convoId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const messagesSnapshot = await getDocs(q);

    return messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));   
}
