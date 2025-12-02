import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import userProfile from './userProfile'
import Login from './pages/Login'
import SignUp from './signup/SignUp'
import Home from './pages/Home'
import Opening from './pages/Opening'
import UserProfile from './userProfile'
import Post from './pages/Post'
import Messages from './pages/Messages'
import Market from './pages/Market'
import {Button} from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'


function App() {
    return(
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Opening />}/>
         <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path= "/userprofile" element={<UserProfile />}/>
          <Route path= "/post" element={<Post />} />
          <Route path= "/messages" element={<Messages />}/>
          <Route path="/market"element={<Market />}/>
        </Routes>
      </Router>

      </>
    )
  }
  /*return (
    <>
      <UserProfile/> 
    </>
  )*/


export default App
