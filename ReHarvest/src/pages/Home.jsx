import React, {useEffect, useState} from "react"
import "./Home.css"
import Nav from "react-bootstrap/Nav"
import {Form, FormControl, Button, ButtonGroup, Stack} from "react-bootstrap"
import Post from "./Post"
import {db} from "../firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore";


function Home(){
    const [posts, setPosts] = useState([]);
    const showPosts = async () => {
      try{
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      }
      catch (error){
        console.log(error);
      }
    }
    useEffect(() => {
      showPosts();
    }, []);

    const[searchQuery, setSearchQuery] = useState('')
    const handleSearch = () => {
        console.log('Searching for:', searchQuery)
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
        <div className="home-container">
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
        
        {/*Code for the search bar*/}
        <div className= "search-bar">
          <i className="bi bi-list"/>
        <Form className= "d-flex align-items-center mt - 3">
            <FormControl
                type="text"
                placeholder= "Search"
                className="mr-sm-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant= "link" onClick={handleSearch}>
              <i className= "bi bi-search"></i>
            </Button>
        </Form>
        </div>

        
        {/*Filter buttons*/}
        <div className= "filter-buttons">
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
      </div>


        <div className="latest-posts">Latest Post</div>

        <Post 
            initialLikes={15}
            initialComments={[]} 
            />
          <div style={{ backgroundColor: 'white', color: 'black' }}>
            {posts.map((post) => (
              <div key={post.id} style={{ marginBottom: "10px" }}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>  
              </div>         
            ))}
          </div>
          </div>
        </>


    )
}
export default Home