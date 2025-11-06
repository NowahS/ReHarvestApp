import React, { useState } from 'react';
import {uploadPost} from "./firebasePosts"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProfilePicture from "./assets/profileIcon.png"
import Nav from "react-bootstrap/Nav"



const UserProfile = () => {
    const[query, setQuery] = useState(' ')
    const [showAddPost, setShowAddPost] = useState(false);
    const [addPost, setAddPost] = useState({title: "", content: ""});
    const [posts, setPosts] = useState([]);
    const handleAddPost = async (e) => {
        e.preventDefault();
        try{
            await uploadPost(addPost.title, addPost.content);
            setPosts([...posts, addPost]);
            setAddPost({title: "", content: ""});
            setShowAddPost(false);
        }
        catch (error){
            console.log(error)
        }
    }
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

    const handleEditSave = () => {
        if (isEditing) {
            console.log('Profile Saved:', profileData);
        }
        setIsEditing(!isEditing);
    };

    return (
        <>
        <Nav fill variant="tabs" defaultActiveKey= "/userprofile">
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
        
        <Container className="profile-container d-flex justify-content-center">
            <Row>
                <Col>
                    <Card className="profile-card">
                        <Card.Body className="profile-card-body p-0 text-center">
            
                            <div className="mb-5 d-flex justify-content-center">
                                <Image
                                    src={ProfilePicture}
                                    alt="Profile Picture"
                                    roundedCircle
                                    className="profile-image"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </div>

                            <h2 className="profile-username">@{profileData.username}</h2>

                            <div className="text-start">
                                <Form.Group className="mb-5">
                                    <Form.Label className="profile-label">Bio</Form.Label>
                                    <br></br>
                                    <Form.Control
                                        as="textarea"
                                        name="bio"
                                        rows={10}
                                        placeholder="Tell us about yourself..."
                                        value={profileData.bio}
                                        onChange={handleInputChange} 
                                        className={`profile-input ${isEditing ? 'editable-input' : ''}`}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <br></br>
                                    <Form.Label className="profile-label">Links/Socials</Form.Label>
                                    <br></br>
                                    <Form.Control
                                        as="textarea"
                                        name="socials"
                                        rows={4}
                                        placeholder="Enter your socials"
                                        value={profileData.socials}
                                        onChange={handleInputChange}
                                        className={`profile-input ${isEditing ? 'editable-input' : ''}`}
                                    />
                                </Form.Group>
                            </div>
                        </Card.Body>

                        <Card.Footer className="profile-card-footer p-4 border-0">
                            <br></br>
                            <Button 
                                variant={isEditing ? "success" : "primary"} 
                                className="w-100"
                                onClick={handleEditSave}
                            >
                                {isEditing ? "Save Changes" : "Edit Profile"}
                            </Button>
                            <br/>
                            <Button onClick = {() => setShowAddPost(!showAddPost)}>+ Add Post</Button>
                            {showAddPost && (
                                <Form onSubmit = {handleAddPost}>
                                    <Form.Control type="text" placeholder = "Title" value = {addPost.title} onChange = {(e) => setAddPost({...addPost, title: e.target.value})}/>
                                    <Form.Control as="textarea" placeholder = "Content" value = {addPost.content} onChange = {(e) => setAddPost({...addPost, content: e.target.value})}/>
                                    <Button type="submit">Submit</Button>
                                </Form>
                            )}
                        </Card.Footer>
                    </Card>
                    <h2 className="w-100 text-white">Your Blog Posts</h2>
                    <div>
                        {posts.map((post, index) => (
                            <Card key={index}>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}</Card.Text>
                                    <Card.Text>{post.createdAt}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
        </>
        
    );
}

export default UserProfile;