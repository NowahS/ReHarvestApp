// Header.jsx
import React from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Header() {
  const navigate = useNavigate();

  const handleMessages = () => {
    navigate("/messages");
  };

  return (
    <header className="container-fluid bg-light py-3">
      <div className="d-flex align-items-center justify-content-between flex-wrap">

        <div className="flex-shrink-0">
          <img
            src="/Logo.png"
            alt="ReHarvest Logo"
            className="img-fluid"
            style={{ maxHeight: "50px", width: "auto" }}
          />
        </div>

        <Nav
          fill
          variant="tabs"
          defaultActiveKey="/home"
          className="flex-grow-1 justify-content-center"
        >
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
              }}
            >
              Blog
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleMessages}>
              <img
                src="/whiteMessage.png"
                alt="Messages Icon"
                style={{ height: "24px", width: "auto" }}
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </header>
  );
}

export default Header;
