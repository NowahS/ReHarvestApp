import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import userProfile from './userProfile'
import Login from './pages/Login'
import SignUp from './signup/SignUp'
import Home from './pages/Home'
import Opening from './pages/Opening'
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
