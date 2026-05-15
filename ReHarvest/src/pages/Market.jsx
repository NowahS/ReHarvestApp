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
    async function init() {
        if(!window.google || !window.google.maps){
            console.warn("Google Maps API not loaded yet.");
            return;
        }

        await customElements.whenDefined("gmp-map");

        const map = document.querySelector("gmp-map");
        const marker = document.querySelector("gmp-advanced-marker");
        const placePicker = document.querySelector("gmpx-place-picker");
        const infowindow = new google.maps.InfoWindow();

        if (!map || !placePicker) return;

        map.innerMap.setOptions({
            mapTypeControl: false
        });

        placePicker.addEventListener("gmpx-placechange", () => {
            const place = placePicker.value;

            if (!place.location) {
                window.alert("No details available for: " + place.name);
                infowindow.close();
                marker.position = null;
                return;
            }

            if (place.viewport) {
                map.innerMap.fitBounds(place.viewport);
            } else {
                map.center = place.location;
                map.zoom = 17;
            }

            marker.position = place.location;
            infowindow.setContent(`
                <strong>${place.displayName}</strong><br>
                <span>${place.formattedAddress}</span>
            `);

            infowindow.open(map.innerMap, marker);

            findNearbyMarkets(place.location, map.innerMap);
        });
    }

    init();
}, []);



        
        function findNearbyMarkets(location, map){
            const service = new google.maps.places.PlacesService(map);

            service.nearbySearch(
                {
                    location, radius: 5000,
                    type: "grocery_or_supermarket",
                    keyword: "grocery store  market",
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

            
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "120px", padding:"10px 60px"}}>

                    <div style ={{ width: "30%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: 0}}>
                        <h1 className="market-title" style={{fontWeight: "bold", fontSize: "42px", lineHeight: "1.2", color: "#e8ff48ff", marginBottom: "20px"}}>Buy Ingredients <br/> near you</h1>
                        
                        
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
                        

                    <gmp-map
                        center-lat= "40.7128"
                        center-lng= "-74.0060"
                        zoom= {13}
                        map-id = "GoogleMaps_ConfigAPIKEY"
                        style={{
                            width: "90%",
                            height: "550px",
                            borderRadius: "20px",
                            overflow: "hidden"
                        }}
                    >
                        <gmp-advanced-marker></gmp-advanced-marker>

                    </gmp-map>
                    
                </div>
                
                <div>
                    <h2 className= "top-3-markets" style={{fontWeight: "bold", fontSize: "42px", lineHeight: "1.2", color:"White" }}>Markets Near You!</h2>
                    <MarketResults topMarkets= {topMarkets}/>
                </div>
        </>
    )
}
export default Market
