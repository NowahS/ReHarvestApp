import React, {useEffect, useState} from "react"
import "./Home.css"
import Nav from "react-bootstrap/Nav"
import { useNavigate } from 'react-router-dom';
import {Form, FormControl, Button, ButtonGroup, Stack} from "react-bootstrap"
import Post from "./Post"
import {db, auth} from "../firebase"
import { collection, getDocs, query, orderBy} from "firebase/firestore";


function Home(){
    const [posts, setPosts] = useState([]);

    const[activeFilter, setActiveFilter] = useState(null);

    const navigate = useNavigate();
    const handleMessages = () => {
      navigate("/messages");
    }


    const showPosts = async () => {
      try {
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
        console.log('Searching for:', searchQuery);
    }

    const handleVegan= () => setActiveFilter("vegan");
    const handleKeto= () => setActiveFilter("keto");
    const handleGlutenFree= () => setActiveFilter("gluten free");
    const handleLactose= () => setActiveFilter("lactose");
    const handleNutFree= () => setActiveFilter("nut free");
    

    const filteredPosts = posts.filter((post) =>{
      if (activeFilter){
        return post?.diet?.toLowerCase() === activeFilter;
      }
      return true;
    })
      .filter((post) =>{
        const search = searchQuery.toLowerCase();
        if (searchQuery.trim()){
          return (post?.title?.toLowerCase().includes(search) ||
          post?.content?.toLowerCase().includes(search));         
        }
        else {
          return true;
        }
      })

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
                <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/market">Market</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onClick={() => {
                        if (auth.currentUser) {
                           navigate(`/userprofile/${auth.currentUser.uid}`);
                        }
                       }}>
                    Blog
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link><img src= "/whiteMessage.png" alt="Messages Icon" className= "nav-icon" onClick = {handleMessages}/></Nav.Link>
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
                onChange={(e) => { setSearchQuery(e.target.value); setActiveFilter(null); }}
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
          <div style={{ backgroundColor: 'white', color: 'black' }}>
            {filteredPosts.map((post) => (
              <Post
              key = {post.id}
              id={post.id}
              userId = {post.userId}
              username={post.username}
              title={post.title}
              content= {post.content}
              fileUrl = {post.fileUrl}
              videoUrl = {post.videoUrl}
              initialLikes = {post.likes || 0}
              initialComments={post.comments || []}
              rating={post.rating || 0}/>  
            ))}
          </div>
          </div>
        </>


    );
}
export default Home