import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProfilePicture from './assets/profileIcon.png';

const userProfile = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Body className="text-center">
                            <div className="mb-4 d-flex justify-content-center">
                                <Image
                                    src={ProfilePicture}
                                    alt="Profile Picture"
                                    roundedCircle
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </div>

                            <h2 className="mb-4">@Username</h2>
                            <Form.Group className="mb-4 text-start">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Tell us about yourself ..."
                                    aria-label="Tell us about yourself ..."
                                />
                            </Form.Group>

                            <Form.Group className="mb-0 text-start">
                                <Form.Label>Links/Socials</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Add your socials"
                                />
                            </Form.Group>
                        </Card.Body>

                        <Card.Footer>
                            <Button variant="primary" className="w-100">Save Changes</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default userProfile;
