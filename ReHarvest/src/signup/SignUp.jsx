import React, {useState} from 'react'
import {signUp} from '../firebaseAuth'
import {Button} from 'react-bootstrap'
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
            navigate('/')

        }
        catch (error){
            console.log(error)
        }
    }
    return(
        <>
        <h1>Sign Up</h1>
        <form onSubmit={submitSignUp}>
            <label>Email</label>
            <input type = "email" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder = "Enter your email"/>

            <label>Username</label>
            <input type = "username" value = {username} onChange={(e) => setUsername(e.target.value)} placeholder = "Enter your username"/>

            <label>Password</label>
            <input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} placeholder = "Enter your password (Min 6 characters)"/>

            <label>Confirm Password</label>
            <input type = "password" value ={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder = "Confirm your password"/>
            <Button type = "submit">Join Now</Button>
        </form>
        </>
    )
}
export default SignUp