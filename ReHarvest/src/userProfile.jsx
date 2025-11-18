import React, { useState, useEffect } from 'react';
import { db, auth } from "./firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { uploadPost } from "./firebasePosts";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfilePicture from "./assets/profileIcon.png";
import Nav from "react-bootstrap/Nav";
import Post from "./pages/Post";
import Card from 'react-bootstrap/Card'
import { FormLabel } from 'react-bootstrap';

const UserProfile = () => {
    //const [query, setQuery] = useState('');
    const [showAddPost, setShowAddPost] = useState(false);
    const [addPost, setAddPost] = useState({ title: "", content: "", category: "", videoUrl: "" });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const[diet, setDiet] = useState("");

    
    const [file, setFile] = useState(null);

    const [profileImage, setProfileImage] = useState(ProfilePicture);
    const [newProfileFile, setNewProfileFile] = useState(null);

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
        const userPosts = await showUserPosts(user.uid);
        setPosts(userPosts);
        }
    });

    return () => unsubscribe(); 
    }, []);


    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            const newPost = await uploadPost(addPost.title, addPost.content, addPost.videoUrl, 0, file, diet);
            setPosts(prevPosts => [newPost, ...prevPosts]);
            setAddPost({ title: "", content: "", videoUrl: ""});
            setDiet("");
            setFile(null);
            setShowAddPost(false);
        }
        catch (error){
            console.log(error);
        } 
    };

    const showUserPosts = async (uid) => {
        if (!uid) {
            return;
        }
        try {
        const postsCollection = collection(db, "posts");
        const q = query(
            postsCollection,
            where("userId", "==", uid)
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

    useEffect(() => {
    showUserPosts();
  }, []);  

    const [profileData, setProfileData] = useState({
        username: 'Username',
        bio: '',
        socials: '',
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

    const handleEditSave = () => {
        if (isEditing) {
            console.log('Profile Saved:', profileData);
            if (newProfileFile) {
                console.log('New file detected for upload:', newProfileFile.name);
            }
        }
        setIsEditing(!isEditing);
    }; 

    return (
        <>
            <Nav fill variant="tabs" defaultActiveKey="/userprofile">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Market</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/userprofile">Blog</Nav.Link>
                </Nav.Item>
            </Nav>
            <br/>

            <div className="post-container mt-4 p-3 border rounded bg-light">
                <Image
                    //src={ProfilePicture}
                    src={profileImage}
                    alt="Profile Picture"
                    roundedCircle
                    className="profile-image"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />

                {isEditing && (
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
                <Button
                    variant={isEditing ? "success" : "primary"}
                    className="w-100"
                    onClick={handleEditSave}
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>

                <br /><br />

                <Button onClick={() => setShowAddPost(!showAddPost)}>+ Add Post</Button>

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

            <h2 className="w-100 text-white mt-4">Your Blog Posts</h2>

           <div>
                {posts.map(post => (
                    <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    fileUrl={post.fileUrl}
                    videoUrl={post.videoUrl}
                    initialLikes={post.likes || 0}
                    initialComments={post.comments || []}
                    rating={post.rating || 0}/>
                           /* <Card key={index}>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}</Card.Text>
                                    {post.file && (
                                        <Card.Text>
                                            {post.createdAt}
                                            File attached: {post.file.name}
                                        </Card.Text>)}
                                </Card.Body>
                            </Card>*/
                ))}
            </div> 
        </>
    );
};

export default UserProfile;