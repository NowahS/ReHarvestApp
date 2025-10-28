import React, {useState} from 'react'
import {signUp} from '../firebaseAuth'
import {Button} from 'react-bootstrap'
let SignUp = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitSignUp = async (e) => {
        try{
            await signUp(username, email, password);
            setEmail("");
            setUsername("");
            setPassword("");
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
            <input  onChange={(e) => setEmail(e.target.value)} placeholder = "Enter your email"/>

            <label>Username</label>
            <input  onChange={(e) => setUsername(e.target.value)} placeholder = "Enter your username"/>

            <label>Password</label>
            <input  onChange={(e) => setPassword(e.target.value)} placeholder = "Enter your password"/>

            <label>Confirm Password</label>
            <input placeholder = "Confirm your password"/>
        </form>
        <Button>Join Now</Button>
        </>
    )
}
export default SignUp