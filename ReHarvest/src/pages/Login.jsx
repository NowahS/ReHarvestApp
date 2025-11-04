import Form from 'react-bootstrap/Form'
import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {logIn} from '../firebaseAuth'
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (e) => {
        e.preventDefault()
        try{
            await logIn(email, password)
            alert("Successfully logged in")
            navigate('/home')

        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <>
            <Container fluid className="mt-5" style= {{ height: "100vh"}}>
                <Form onSubmit = {submitLogin}>
                <div style={{width: "100%", maxwidth: "4000px"}}>
                    <h1 className= "text-center mb-4 fw-bold text-white">Login</h1>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
                         </Form.Group>

                        <Form.Group className="mb-4" controlId="formGroupPassword">
                            <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                </div>

                <div className="d-grid">
                    <Button variant= "success" type= "submit">Login</Button>
                </div>
            </Form>
        </Container>
        </>
    )
}
export default Login