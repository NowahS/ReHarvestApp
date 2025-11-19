import React, {useState, useEffect} from 'react';
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";

function Messages() {
    return(
        <>
        <div classname = "messages-container">
            <header className= "nav-custom">
                <div className= "nav-left">
                <img src= "/Logo.png" alt="ReHarvest Logo" className= "logo"/>
                </div>
                <Nav fill variant="tabs" defaultActiveKey= "/home" className="navbar-custom mb-4">
            
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Market</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/userprofile">Blog</Nav.Link>
                </Nav.Item>
                </Nav>
            </header>
        </div>
        </>
    );
}
export default Messages;