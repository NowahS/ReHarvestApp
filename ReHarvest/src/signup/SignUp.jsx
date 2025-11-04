import React, {useState} from 'react'
import {signUp} from '../firebaseAuth'
import {Button, Container, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
let SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const submitSignUp = async (e) => {
        e.preventDefault()
        if (password.toString().toLowerCase() != confirmPassword.toString().toLowerCase()){
            alert("Passwords do not match!")
        }
        if (password.length < 6){
            alert("Passwords need to be minimum of 6 characters!")
        }
        try{
            await signUp(username, email, password)
            alert("Successfully signed up")
            navigate('/home')

        }
        catch (error){
            console.log(error)
        }
    }
    return(
        <>
        <h1 className= "text-center mb-4 fw-bold text-white">Sign Up</h1>
        <Container>
        <Form onSubmit={submitSignUp}>
            <div style={{width: "100%", maxwidth: "4000px"}}>
            
            <Form.Group>
            <div>
            <Form.Label style={{ color: 'white' }}>Email</Form.Label>
            </div>
            <Form.Control type = "email" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder = "Enter your email"/>
            </Form.Group>

            <Form.Group>
            <div>
            <Form.Label style={{ color: 'white' }}>Username</Form.Label>
            </div>
            <Form.Control type = "username" value = {username} onChange={(e) => setUsername(e.target.value)} placeholder = "Enter your username"/>
            </Form.Group>

            <Form.Group>
            <div>
            <Form.Label style={{ color: 'white' }}>Password (Min 6 characters)</Form.Label>
            </div>
            <Form.Control type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} placeholder = "Enter your password"/>
            </Form.Group>

            <Form.Group>
            <div>
            <Form.Label style={{ color: 'white' }}>Confirm Password</Form.Label>
            </div>
            <Form.Control type = "password" value ={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder = "Confirm your password"/>
            </Form.Group>

            <div className="d-grid">
            <Button variant= "success" type = "submit">Join Now</Button>
            </div>
            </div>
        </Form>
        </Container>
        </>
    )
}
export default SignUp