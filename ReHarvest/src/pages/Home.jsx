import React from "react"
import Nav from "react-bootstrap/Nav"
import {Form, FormControl, Button} from "react-bootstrap"

function Home(){

    const[query, setQuery] = userState(' ')
    const handleSearch = () => {
        console.log('Searching for:', query)
    }

    return(
        <>
        <Nav fill variant="tabs" defaultActiveKey= "/home">
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventLey="link-1">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Market</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3">Blog</Nav.Link>
            </Nav.Item>
        </Nav>
        
        {/*Code for the search bar*/}
        <Form inline>
            <FormControl
                type="text"
                placeholder= "Search"
                classname="mr-sm-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant= "outline-success" onClick={handleSearch}></Button>
        </Form>

        <h2>Latest Post</h2>
        </>

    )
}