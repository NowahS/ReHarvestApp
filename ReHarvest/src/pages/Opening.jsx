import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Button } from 'react-bootstrap'

function Opening(){
    return(
      <>
      <Container>
        <h1 className="mb-4 fw-bold text-white">ReHarvest</h1>
        <div>
          <Button as= {Link} to="/login" variant="success">Login</Button>
          <Button as= {Link} to="/signup" variant="warning">Sign Up</Button>
        </div>
      </Container>
      </>
    )

}
export default Opening