import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect id="bar" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand id="brand">Get Stuff Done</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav
              className="col justify-content-around"
              variant="pills"
              id="nav"
            >
              <Nav.Link id="link" as={Link} to="/stuff" eventKey={1}>
                Stuff to do
              </Nav.Link>
              <Nav.Link id="link" as={Link} to="/settings" eventKey={2}>
                Settings
              </Nav.Link>
              <Nav.Link id="link" as={Link} to="/info" eventKey={3}>
                Info
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
