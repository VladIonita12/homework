import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'animate.css'
import AOS from 'aos'
import PacketCard from './components/Packet/packet-component'
import PachetStore from './store/PachetStore';
class App extends Component {

  constructor(){
    super();
    this.state = {
      pachete: [],
      selectedPachet:null
      
    };

    this.select = (pachet) =>{
      this.setState({
          selectedPachet: pachet
      })
  }
  this.cancel = ()  => {
    this.setState({
      selectedContract:null
    })
}

    this.store = new PachetStore();
  }
  async componentDidMount() {

    this.store.getPachete()
    
    this.store.emitter.addListener('GET_PCK_SUCCESS', ()=>{
      
        this.setState({
            pachete: this.store.pachete
        })
        
    })
  }
  render(){
    AOS.init();
    return (
      <div className="App">
        <div></div>
      
        <div>
      <Navbar collapseOnSelect expand="lg" bg="white" variant="white" fixed="top">
  <Navbar.Brand href="#home">Application</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav>
      <Nav.Link>Login</Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
<header class="masthead animate__animated animate__backInDown">
                    <div class="container h-100">
                        <div class="row h-50 align-items-center justify-content-center text-center">
                            <div class="align-middle">
                                <h1 class="text-uppercase text-black align-middle font-weight-bold">Event Planner</h1>
                               </div>
                              
                        </div>
                    </div>
                </header>

                <div class="container">
  <div class="card-list" >
    
  {
                    this.state.pachete.map((e,i) => <PacketCard key={i}  item={e} onSelect={this.select} />)
                    
                    }
   
  </div>
</div>

</div>

)
  }
}


export default App;