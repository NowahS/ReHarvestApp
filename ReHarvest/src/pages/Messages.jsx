import React, {useState, useEffect} from 'react';
import {db, auth} from "../firebase"
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp} from "firebase/firestore";
import {Button} from "react-bootstrap";
import { useNavigate} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import { getUserBlog } from "../firebaseBio";

function Messages() {
    const navigate = useNavigate();
    const handleMessages = () => {
      navigate("/messages");
    }  
    const [contacts, setContacts] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [selectedConvo, setSelectedConvo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(''); 

    const user = auth.currentUser;


    useEffect(() => {
        const loadContacts = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const q = query(
                collection(db, "conversations"),
                where("participants", "array-contains", user.uid)
            );
            const snapshot = await getDocs(q);

            const contactList = [];

            for (const docSnap of snapshot.docs) {
                const participants = docSnap.data().participants;
                const otherUserId = participants.find(id => id !== user.uid);

                // Load username + profile image
                const otherProfile = await getUserBlog(otherUserId);

                contactList.push({
                    convoId: docSnap.id,
                    userId: otherUserId,
                    username: otherProfile.username || "User",
                });
            }

            setContacts(contactList);
            setLoadingContacts(false);
        };

        // ensures user is available before loading
        const unsub = auth.onAuthStateChanged(() => loadContacts());
        return () => unsub();
    }, [])

    const loadMessages = async (convoId) => {
        const msgsRef = collection(db, 'conversations', convoId, 'messages');
        const q = query(msgsRef, orderBy('timestamp', 'asc'));
        const snapshot = await getDocs(q);
        const loadedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(loadedMessages);
   };

    const handleSelectContact = async (convoId) => {
        setSelectedConvo(convoId);
        await loadMessages(convoId);
    };

   const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedConvo) return;
        const msgsRef = collection(db, 'conversations', selectedConvo, 'messages');
        await addDoc(msgsRef, {
            senderId: user.uid,
            text: newMessage,
            timestamp: serverTimestamp(),
         });
        setNewMessage('');
        await loadMessages(selectedConvo);
    };
    return(
        <>
        <div className = "messages-container">
            <header className= "nav-custom">
                <div className= "nav-left">
                <img src= "/Logo.png" alt="ReHarvest Logo" className= "logo"/>
                </div>               
                <Nav fill variant="tabs" defaultActiveKey= "/" className="navbar-custom mb-4">
            
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href= "/market">Market</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                          onClick={() => {
                             if (auth.currentUser) {
                                navigate(`/userprofile/${auth.currentUser.uid}`);
                             }
                            }}>
                        Blog
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link><img src= "/whiteMessage.png" alt="Messages Icon" className= "nav-icon" onClick = {handleMessages}/></Nav.Link>
                </Nav.Item>
                </Nav>
            </header>

            <div className="messages-content p-4">
                <div className="row p-4">
                    <div className="col-md-6 bg-white">
                        <div>
                        <h2 className="text-center mt-4">Contacts</h2>
                        </div>
                        <div className="card-body">
                                {contacts.length === 0 && (
                                    <li>No contacts</li>
                                )}
                                {contacts.map((c) =>
                                    <Button
                                        key={c.convoId}
                                        onClick={() => handleSelectContact(c.convoId)}
                                        className={`list-group-item list-group-item-action ${
                                            selectedConvo === c.convoId ? "active" : ""
                                        }`}                                        >
                                        <b>{c.username}</b>
                                    </Button>
                                )}
                        </div>
                    </div>
                    <div className="col-md-6 bg-white p-4">
                        <div>
                        <h2 className="text-center mt-4">Messages</h2>
                        </div>
                        <div className="card-body">
                            {messages.length === 0 ? (
                                <p>Select a contact to view messages</p>
                            ):(
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`p-2 mb-2 rounded w-75 ${
                                        msg.senderId === user.uid
                                            ? "ms-auto bg-primary text-white"
                                            : "bg-light border"
                                        }`}                            
                                    >{msg.text}</div>
                                ))
                            )}
                        </div>

                        <input type="text" className="form-control bg-white" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                        <Button className="btn btn-success btn-sm" onClick={handleSendMessage}> Send </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default Messages;