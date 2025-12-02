import React, {useEffect, useState, useRef}from "react"
import Nav from "react-bootstrap/Nav"
import { useNavigate } from 'react-router-dom';





const Market = () =>{
    const navigate = useNavigate();
    const handleMessages = () => {
      navigate("/messages");
    }

     

        {/*code for map*/}
        const mapRef = useRef(null);
        const mapInstance = useRef(null);
        const inputRef = useRef(null);

        useEffect(() => {
            if(!window.google || !mapRef.current || !inputRef.current) return;

           const map = new google.maps.Map(mapRef.current,{
            center: {lat: 40.7128, lng: -74.0060}, zoom: 13,
           });

           
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
            autocomplete.bindTo("bounds", map);

            autocomplete?.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if(!place.geometry || !place.geometry.location) return;

                map.setCenter(place.geometry.location);

                new google.maps.marker.AdvancedMarkerElement({
                    map: map,
                    position: place.geometry.location,
                    title: place.name,
                });
            });

            mapInstance.current = map;
        
        }, []);
    
    return(
        <>
            <div className="market-container">
            <header className= "nav-custom">
            <div className= "nav-left">
              <img src= "/Logo.png" alt="ReHarvest Logo" className= "logo"/>
            </div>
            <Nav fill variant="tabs" defaultActiveKey= "/market" className="navbar-custom mb-4">
         
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">About</Nav.Link>
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

            {/*code for map*/}
                <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "200px", padding:"40px 60px"}}>

                    <div style ={{ width: "35%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                        <h1 className="market-title" style={{fontWeight: "bold", fontSize: "42px", lineHeight: "1.2", color: "#e8ff48ff", marginBottom: "20px"}}>Buy Ingredients <br/> near you</h1>
                        <input
                            ref={inputRef}
                            type= "text"
                            placeholder="Search for a place..."
                            style={{width: "100%", marginTop: "20px", padding: "10px", fontSize: "18px", borderRadius: "8px", border: "1px solid #ccc"}}
                        />

                </div>

                <div
                    ref={mapRef}
                    style={{
                        width: "100%",
                        height: "550px",
                        borderRadius: "20px",
                        overflow: "hidden",
                    }}/>
            </div>
        </>
    )
}
export default Market

