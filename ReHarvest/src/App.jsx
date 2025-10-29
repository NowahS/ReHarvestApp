import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import SignUp from './signup/SignUp'
import {Button} from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <UserProfile/> 
    </>
  )
}

export default App
