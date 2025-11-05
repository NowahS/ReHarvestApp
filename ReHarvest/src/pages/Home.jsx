import React, {useState} from "react"
import Nav from "react-bootstrap/Nav"
import {Form, FormControl, Button, ButtonGroup, Stack} from "react-bootstrap"
import Post from "./Post"

function Home(){

    const[query, setQuery] = useState(' ')
    const handleSearch = () => {
        console.log('Searching for:', query)
    }

    const handleVegan= () => {
        console.log('Vegan filter')
    }
    const handleKeto= () => {
        console.log('Keto filter')
    }
    const handleGlutenFree= () => {
        console.log('Gluten Free filter')
    }
    const handleLactose= () => {
        console.log('Lactose filter')
    }
    const handleNutFree= () => {
        console.log('Nut Free filter')
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
        <Form className= "d-flex align-items-center mt - 3">
            <FormControl
                type="text"
                placeholder= "Search"
                className="mr-sm-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant= "link" onClick={handleSearch}>
              <i className= "bi bi-search"></i>
            </Button>
        </Form>

        <h2 className="mb-4 fw-bold text-white">Latest Post</h2>
        {/*Filter buttons*/}
        <Button 
        variant="success" 
        size="lg" 
        onClick={handleVegan} 
      >
        VEGAN
      </Button>
      <Button 
        variant="warning" 
        size="lg" 
        onClick={handleKeto} 
      >
        Keto
      </Button>

      <Button 
        variant="danger" 
        size="lg" 
        onClick={handleGlutenFree} 
      >
        Gluten Free
      </Button>

      <Button 
        variant="info" 
        size="lg" 
        onClick={handleLactose} 
      >
        Lactose
      </Button>

      <Button 
        variant="secondary" 
        size="lg" 
        onClick={handleNutFree} 
      >
        Nut Free
      </Button>


        <h2>Latest Post</h2>

        <Post 
            initialLikes={15}
            initialComments={[]} 
            />
        </>

    )
}
export default Home