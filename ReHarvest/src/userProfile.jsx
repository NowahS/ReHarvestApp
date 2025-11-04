import React, { useState } from 'react';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProfilePicture from "./assets/profileIcon.png"


const UserProfile = () => {
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
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfile;