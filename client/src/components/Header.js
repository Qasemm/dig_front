import React, { Component } from 'react'
import { Navbar, Container, Nav } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";

export class Header extends Component {
    render() {
        return (
          <div>
            <Navbar bg="dark" variant="dark" style={{position: 'sticky',top: '0'}}>
              <Container>
                {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
                <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/fav">favorite</Nav.Link>
                  <Nav.Link href="/about">About Us</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          </div>
        );
    }
}

export default Header
