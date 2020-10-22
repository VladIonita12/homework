import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'animate.css/animate.min.css';
class App extends Component {

  constructor(){
    super();

  }

  render(){
    return (
      <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav>
      <Nav.Link href="#deets">Login</Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
<section className="animate__animated animate__backInLeft">
                    <div class="container h-100 ">
                        <div class="row h-100 align-items-center justify-content-center text-center ">
                            <div class="col-lg-10 align-self-end">
                                <h1 class="text-uppercase font-weight-bold">Kontract Document Manager</h1>
                                
                            </div>
                            <div class="col-lg-8 align-self-baseline">
                                
                            </div>
                        </div>
                    </div>
                </section>



</div>
)
  }
}


export default App;