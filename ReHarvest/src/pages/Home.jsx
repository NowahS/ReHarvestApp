import React from "react"
import Nav from "react-bootstrap/Nav"
import {Form, FormControl, Button} from "react-bootstrap"
import {useState} from 'react'

function Home(){

    const[query, setQuery] = useState(' ')
    const handleSearch = () => {
        console.log('Searching for:', query)
    }

    return(
        <>
        <Nav fill variant="tabs" defaultActiveKey= "/home">
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
        
        {/*Code for the search bar*/}
        <Form inline="true">
            <FormControl
                type="text"
                placeholder= "Search"
                className="mr-sm-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant= "outline-success" onClick={handleSearch}></Button>
        </Form>

        <h2 className="mb-4 fw-bold text-white">Latest Post</h2>
        </>

    )
}
export default Home