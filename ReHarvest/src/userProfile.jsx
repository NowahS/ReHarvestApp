import React, { useState, useEffect } from 'react';
import { db, auth } from "./firebase";
import { useNavigate } from 'react-router-dom';
import { getUserBlog, editUserBlog } from "./firebaseBio";
import { collection, getDocs, query, where} from "firebase/firestore";
import { uploadPost } from "./firebasePosts";
import { startConversation } from "./firebaseConvos";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfilePicture from "./assets/profileIcon.png";
import Nav from "react-bootstrap/Nav";
import Post from "./pages/Post";
import Card from 'react-bootstrap/Card'
import { FormLabel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [showAddPost, setShowAddPost] = useState(false);
    const [addPost, setAddPost] = useState({ title: "", content: "", category: "", videoUrl: "" });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const[diet, setDiet] = useState("");

    const { uid } = useParams();
    const user = auth.currentUser;
    const profileUid = uid || (user ? user.uid : null);
    const isLoggedUser = user && user.uid === profileUid;
    
    const [file, setFile] = useState(null);

    const [profileImage, setProfileImage] = useState(ProfilePicture);
    const [newProfileFile, setNewProfileFile] = useState(null);

    const navigate = useNavigate();
    const handleMessages = () => {
      navigate("/messages");
    }  

    useEffect(() => {
    const fetchData = async () => {
        if (!profileUid) return;

        const profile = await getUserBlog(profileUid);
         setProfileData({
            username: profile.username || "",
            bio: profile.userBio || "",
            socials: profile.userSocials || "",
        })
        const userPosts = await showUserPosts(profileUid);
        setPosts(userPosts);
    };

      fetchData();
    }, [profileUid]);


    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            const newPost = await uploadPost(addPost.title, addPost.content, addPost.videoUrl, 0, file, diet);
            if (newPost && newPost.id) {
                setPosts(prevPosts => [newPost, ...prevPosts]);
            } 
            else {
                console.log("failed to create post");
            }
            setAddPost({ title: "", content: "", videoUrl: ""});
            setDiet("");
            setFile(null);
            setShowAddPost(false);
        }
        catch (error){
            console.log(error);
        } 
    };

    const handleStartConversation = async () => {
        if (!auth.currentUser) return;

        const currentUserId = auth.currentUser.uid;
        const otherUserId = profileUid;

        const convoId = await startConversation(currentUserId, otherUserId);
        if (convoId) {
        navigate(`/messages?convoId=${convoId}`);
    }
    }

    const showUserPosts = async (uidParam) => {
        const idUsed = uidParam || profileUid;
        if (!idUsed) {
            return;
        }
        try {
        const postsCollection = collection(db, "posts");
        const q = query(
            postsCollection,
            where("userId", "==", idUsed)
        );

        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return postsData;
        } 
        catch (error) {
        console.log("Error fetching user posts:", error);
        return [];
        }
    };   
 

    const [profileData, setProfileData] = useState({
        username: '',
        bio: '',
        socials: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file){
            setNewProfileFile(file);
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        if (!isEditing) {
                setIsEditing(true);
                return;
        }
        try{
            const user = auth.currentUser;
            if (!user){
                alert("You aren't logged in");
                return;
            }
            await editUserBlog(
                profileData.username,
                profileData.bio,
                profileData.socials
            );
            setIsEditing(false);            
        }
        catch(error){
            console.log(error);
        }
    }; 

    return (
        <>
          <header className= "nav-custom">
            <div className= "nav-left">
              <img src= "/Logo.png" alt="ReHarvest Logo" className= "logo"/>
            </div>
            <Nav fill variant="tabs" defaultActiveKey="/userprofile" className="navbar-custom mb-4">
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
            <br/>

            <div className="post-container mt-4 p-3 border rounded bg-light">
                <Image
                    src={profileImage}
                    alt="Profile Picture"
                    roundedCircle
                    className="profile-image"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />

                {isLoggedUser &&isEditing && (
                    <Form.Group controlId="formFile" className="mb-3" >
                        <FormLabel className="text-muted">Change Profile Picture</FormLabel>
                        <Form.Control 
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                )}

                <h2 className="profile-username">@{profileData.username}</h2>
                {!isLoggedUser && (
                    <Button onClick={handleStartConversation}>
                        Send Message
                    </Button>
                )}

                <div className="text-start">
                    <Form.Group className="mb-5">
                        <Form.Label className="profile-label">Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="bio"
                            rows={4}
                            placeholder="Tell us about yourself..."
                            value={profileData.bio}
                            onChange={handleInputChange}
                            className={`profile-input ${isEditing ? 'editable-input' : ''}`}
                            disabled={!isEditing}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="profile-label">Links/Socials</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="socials"
                            rows={2}
                            placeholder="Enter your socials"
                            value={profileData.socials}
                            onChange={handleInputChange}
                            className={`profile-input ${isEditing ? 'editable-input' : ''}`}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                </div>
            </div>

            <div className="profile-card-footer p-4 border-0">
                {isLoggedUser && (
                <Button
                    variant={isEditing ? "success" : "primary"}
                    className="w-100"
                    onClick={handleEditSave}
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
                )}
                <br /><br />


                {isLoggedUser && (
                <Button onClick={() => setShowAddPost(!showAddPost)}>+ Add Post</Button>
                )}

                {showAddPost && (
                    <Form onSubmit = {handleAddPost}>
                        <Form.Control type="text" placeholder = "Title" value = {addPost.title} onChange = {(e) => setAddPost({...addPost, title: e.target.value})} required/>

                        <Form.Control as="textarea" placeholder = "Content" value = {addPost.content} onChange = {(e) => setAddPost({...addPost, content: e.target.value})}/>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Diet Category</Form.Label>
                            <Form.Select value={diet} onChange={(e) => setDiet(e.target.value)}>
                                <option value= "">Select category...</option>
                                <option value= "vegan">Vegan</option>
                                <option value= "keto">Keto</option>
                                <option value= "gluten free">Gluten Free</option>
                                <option value= "lactose">Lactose</option>
                                <option value= "nut free">Nut Free</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Add a Photo</Form.Label>
                            <Form.Control type = "file" onChange = {(e) => setFile(e.target.files[0])} accept="image/*"/>
                        </Form.Group>

                        <Form.Control type="text" placeholder= "Video URL (optional YouTube/Vimeo or mp4 link)" value= {addPost.videoUrl} onChange={(e) => setAddPost({...addPost, videoUrl: e.target.value })} className= "mb-2"/>
                        <Button type="submit">Submit</Button>
                    </Form>
            )}

            </div>

            <h2 className="w-100 text-white mt-4">Blog Posts</h2>

           <div>
                {posts.map(post => (
                    <Post
                    key={post.id}
                    id={post.id}
                    userId = {post.userId}
                    username={post.username}
                    title={post.title}
                    content={post.content}
                    fileUrl={post.fileUrl}
                    videoUrl={post.videoUrl}
                    initialLikes={post.likes || 0}
                    initialComments={post.comments || []}
                    rating={post.rating || 0}/>
                ))}
            </div> 
        </>
    );
};

export default UserProfile;