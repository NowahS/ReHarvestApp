import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import {Button, Col, Container, Row} from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import Market from "../assets/market.png";
import Veggies from "../assets/veggies.png";
import Substainablity from "../assets/substainablity.png";
import Food from "../assets/food.png";
import Plate from "../assets/plate.png";

function About (){
    const handleResource1 = () => window.open("https://sustainablefoodtrust.org/", '_blank');
    const handleResource2 = () => window.open("https://sustainablefoodlab.org/", '_blank');
    const handleResource3 = () => window.open("https://foodprint.org/", '_blank');

    const navigate = useNavigate();
    const handleMessages = () => {
        navigate("/messages");
    }

    return (
    <>
    <div className="about-container">
        <header className= "nav-custom">
            <div className= "nav-left">
              <img src= "/Logo.png" alt="ReHarvest Logo" className= "logo"/>
            </div>
            <Nav fill variant="tabs" defaultActiveKey= "/market" className="navbar-custom mb-4">
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href= "/market">Market</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/userprofile">Blog</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link><img src= "/whiteMessage.png" alt="Messages Icon" className= "nav-icon" onClick = {handleMessages}/></Nav.Link>
            </Nav.Item>
            </Nav>
        </header>
    </div>
        <br></br>
    
    
    <Container>
        <div style={{ backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '15px'  }}>
            <br></br>
            <h1 className="mb-4 fw-bold">About ReHarvest</h1>
            <br></br>
            <p>
            Our goal at ReHarvest is to solve the issue of over-consumption and food waste that 
            many of society contributes to due to over-purchasing goods such as with buying 
            groceries in bulk, causing many food products to go to waste. This is an important 
            issue to solve because constant food waste creates a never ending cycle of buying in 
            bulk, using only a portion of the goods before expiration, and throwing away the rest. 
            To add on, with over-consumption comes over-production to meet demands of consumers 
            that in the end, aren’t necessarily as high as initially portrayed.
            </p>

            <Image
                src={Veggies}
                alt="Veggie"
                rounded
                className="mb-3"
                style={{ width: '850px', maxHeight: '850px', objectFit: 'cover' }}
            />
            <br></br>
            <br></br>
            <h2 className="mb-4 fw-bold">Our Approach</h2>
            <p>
            At ReHarvest we teach our users how to cook using minimal ingredients for popular meals, 
            in turn teaching them to lessen their bulk buys when it comes to food. We will also 
            introduce them to other varieties of meals such as vegan to help with lessening meat 
            production. There will also be a social aspect to our app that allows users to converse 
            with one another and share ideas when it comes to recipes, introducing others to more 
            sustainables ways for food.
            </p>

            <Image
                src={Market}
                alt="market"
                rounded
                className="mb-3"
                style={{ width: '500px', height: '500px', objectFit: 'cover' }}
            />
            <br></br>
            <br></br>
            <br></br>

            <h3 className="mb-4 fw-bold">Resources</h3>
            <br></br>
           
            <div className= "d-flex flex-wrap">
                <Image
                    src={Substainablity}
                    alt= "image"
                    rounded
                    className="mb-3 me-4"
                    style={{ width: '350px', height: '350px', objectFit: 'cover' }}
                />
                <Row className="mb-4 align-items-center">
                    <Col md={30}> 
                    <p className="mb-4 fw-bold">Learn about sustainable food and farming systems that are benifical to the environment.</p>
                    <Button variant="success" onClick={handleResource1}>Find out more</Button>
                    </Col>
                </Row>
                <Image
                    src={Food}
                    alt= "image"
                    rounded
                    className="mb-3 me-4"
                    style={{ width: '350px', height: '350px', objectFit: 'cover' }}
                />
                <Row className="mb-4 align-items-center">
                    <Col md={30}> 
                    <p className="mb-4 fw-bold">Shift sustainability from niche to mainstream in the food system.</p>
                    <Button variant="success" onClick={handleResource2}>Find out more</Button>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Image
                    src={Plate}
                    alt= "image"
                    rounded
                    className="mb-3 me-4"
                    style={{ width: '350px', height: '350px', objectFit: 'cover' }}
                />
                <Row className="mb-4 align-items-center">
                    <Col md={30}> 
                    <p className="mb-4 fw-bold">Lets help you make food choices that does not harm the environment, animals and people.</p>
                    <Button variant="success" onClick={handleResource3}>Find out more</Button>
                    </Col>
                </Row>
                <br></br>
                <br></br>
            </div>
        

        </div>
      </Container>
    </>
    )
}
export default About;
