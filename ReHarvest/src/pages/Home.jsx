import React, {useEffect, useState} from "react"
import "./Home.css"
import Nav from "react-bootstrap/Nav"
import {Form, FormControl, Button, ButtonGroup, Stack} from "react-bootstrap"
import Post from "./Post"
import {db} from "../firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore";


function Home(){
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState(null);

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
        setFilter(null)
    }

    const handleFilter = (filterName) => {
      console.log(`${filterName} filter toggled`)
      setFilter(filter === filterName ? null : filterName)
    }

    const filteredPosts = posts.filter((post) => {
      if (!filter) return true;

      return (
        post.category && post.category.toLowerCase() === filter.toLowerCase()
      )
    })

    const getVariant = (filterName, defaultVariant) => {
      return filter === filterName ? "primary" : defaultVariant
    }

    /*
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
    */

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
        variant={getVariant("Vegan", "success")}
        size="lg"  
        onClick={() => handleFilter("Vegan")}
      >
        VEGAN
      </Button>
      <Button  
        variant={getVariant("Keto", "warning")}
        size="lg"  
        onClick={() => handleFilter("Keto")} 
      >
        Keto
      </Button>

      <Button 
        variant={getVariant("Gluten Free", "danger")}
        size="lg"  
        onClick={() => handleFilter("Gluten Free")}
      >
        Gluten Free
      </Button>

      <Button 
        variant={getVariant("Lactose", "info")}
        size="lg"  
        onClick={() => handleFilter("Lactose")}
      >
        Lactose
      </Button>

      <Button 
        variant={getVariant("Nut Free", "secondary")}
        size="lg"  
        onClick={() => handleFilter("Nut Free")} 
      >
        Nut Free
      </Button>
      </div>


        <div className="latest-posts">Latest Post</div>
          <div style={{ backgroundColor: 'white', color: 'black' }}>
            {/*{posts.map((post) => ( */}
            {filteredPosts.map((post) => (
              <Post
              key = {post.id}
              id={post.id}
              title={post.title}
              content= {post.content}
              category= {post.category}
              videoUrl = {post.videoUrl}
              initialLikes = {0}
              initialComments={[]}
              rating={post.rating || 0}/>  
            ))}
          </div>
          </div>
        </>


    );
}
export default Home