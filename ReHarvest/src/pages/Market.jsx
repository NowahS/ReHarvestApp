import React, {useEffect, useState, useRef}from "react"
import Nav from "react-bootstrap/Nav"
import { useNavigate } from 'react-router-dom';






const Market = () =>{
    const navigate = useNavigate();
    const handleMessages = () => {
      navigate("/messages");
    }

     

       
        const mapRef = useRef(null);
        const mapInstance = useRef(null);
        const inputRef = useRef(null);

       
        const [topMarkets, setTopMarkets] = useState([]);

        useEffect(() => {
            if (!window.google || !mapRef.current) return;

            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 40.7128, lng: -74.0060 },
                zoom: 13,
            });

            const autoEl = document.getElementById("autocomplete");

            autoEl.addEventListener("gmpx-placeselect", async(event) => {
            const place = event.target.value;

            if (!place || !place.location) return;

            map.setCenter(place.location);
            map.setZoom(15);

            new google.maps.marker.AdvancedMarkerElement({
                map,
                position: place.location,
                title: place.displayName,
            });

            findNearbyMarkets(place.location);
        });

        mapInstance.current = map;
    }, []);


        
        function findNearbyMarkets(location){
            const service = new google.maps.places.PlacesService(mapInstance.current);

            service.nearbySearch(
                {
                    location, radius: 5000,
                    type: "supermarket",
                },
                (results, status) => {
                    if(status === "OK" && results.length > 0){
                        const topThree = results.slice(0, 3);
                        setTopMarkets(topThree);
                    }
                }
            );
        }

        const MarketResults = ({topMarkets}) =>{
            if(topMarkets.length === 0) return null;

            return(
                <div
                    style={{
                        marginTop: "40px",
                        display: "flex",
                        gap: "20px",
                        justifyContent: "space-between",
                    }}
                >
                    {topMarkets.map((mkt, i) => (
                        <div
                            key= {i}
                            style={{
                                width: "32%",
                                padding: "20px",
                                borderRadius: "12px",
                                background: "#222",
                                color: "white",
                            }}
                        >
                            <h3>{mkt.name}</h3>
                            <p>{mkt.vicinity}</p>
                            <p>Rating: ⭐ {mkt.rating || "N/A"} </p>
                        </div>
                    ))}

                </div>
            );
        };
    
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

            
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "310px", padding:"10px 60px"}}>

                    <div style ={{ width: "30%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: 0}}>
                        <h1 className="market-title" style={{fontWeight: "bold", fontSize: "42px", lineHeight: "1.2", color: "#e8ff48ff", marginBottom: "20px"}}>Buy Ingredients <br/> near you</h1>
                        
                        <div id="pac-container" style={{ width: "100%", marginTop: "20px" }}>
                            <gmpx-place-picker
                                id="autocomplete"
                                placeholder="Search for a place..."
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "10px",
                                    border: "1px solid #ccc",
                                    background: "white",
                                    color: "black",
                                    fontSize: "18px",
                                }}
                            ></gmpx-place-picker>
                        </div>
                    </div>

                <div
                    ref={mapRef}
                    style={{
                        width: "55%",
                        height: "550px",
                        borderRadius: "20px",
                        overflow: "hidden",
                        flexShrink: 0
                    }}
                ></div>
            </div>
            <div>
                <h2 className= "top-3-markets" style={{fontWeight: "bold", fontSize: "42px", lineHeight: "1.2", color:"White" }}>Markets Near You!</h2>
            <MarketResults topMarkets= {topMarkets}/>
            </div>
        </>
    )
}
export default Market