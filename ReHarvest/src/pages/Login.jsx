import Form from 'react-bootstrap/Form'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function Login(){
    return(
        <>
            <Container fluid className="mt-5" style= {{ height: "100vh"}}>
                <div style={{width: "100%", maxwidth: "4000px"}}>
                    <h1 className= "text-center mb-4 fw-bold text-white">Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                         </Form.Group>

                        <Form.Group className="mb-4" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                        </Form.Group>
                    </Form>
                </div>

                <div className="d-grid">
                    <Button variant= "success" type= "submit">Login</Button>
                </div>
        </Container>
        </>
    )
}
export default Login