import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'animate.css'
import AOS from 'aos'
import PacketCard from './components/Packet/packet-component'
import PachetStore from './store/PachetStore';
import FormInscriere from './components/FormInscriere/form-inscriere';
import ModalMade from './components/Modal/modal'
import UserStore from './store/UserStore';
import AccountComponent from './components/Account/account-component';

class App extends Component {

  constructor(){
    super();
    this.state = {
      pachete: [],
      selectedPachet:null,
      show:false,
      setShow: false,
      usersData:null,
      go: false,
      account:null
    };

    this.select = (pachet) =>{
      this.setState({
          selectedPachet: pachet
      })
  }
  this.cancel = ()  => {
    this.setState({
      selectedPachet: null
    })
   
}
this.handleAccount = (accValue) => {
  console.log(accValue)
  this.setState({account: accValue});
  
}

  this.handleClose = () => {this.setState({setShow:false})}
  this.handleShow = () => {this.setState({setShow:true})}
    this.store = new PachetStore();
    this.store1 = new UserStore();
  }
  async componentDidMount() {
    AOS.init();
    this.store.getPachete()
    this.store1.getUsers()
    
    this.store1.emitter.addListener('GET_USERS_SUCCESS', ()=>{
    
      this.setState({
          usersData : this.store1.users
      })
      
  })
    this.store.emitter.addListener('GET_PCK_SUCCESS', ()=>{
      
        this.setState({
            pachete: this.store.pachete
        })
        
    })

  }
  render(){
    
    AOS.init();
    if(this.state.account)
  return <AccountComponent account={this.state.account}></AccountComponent>
    if(this.state.selectedPachet)
    return <FormInscriere item={this.state.selectedPachet} onCancel={this.cancel}></FormInscriere>
    return (
      <div className="App">
        
       
        
      

       <Modal
         show={this.state.show}
         onHide={this.handleClose}
         backdrop="static"
         keyboard={false}
       >
         <Modal.Header closeButton>
           <Modal.Title>Modal title</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           I will not close if you click outside me. Don't even try to press
           escape key.
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={this.handleClose}>
             Close
           </Button>
           <Button variant="primary">Understood</Button>
         </Modal.Footer>
       </Modal>
     
        <div></div>
      
        <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
  <Navbar.Brand href="#home">Application</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav>
    { this.state.usersData && <ModalMade onSelectAccount={this.handleAccount} storage={this.state.usersData}></ModalMade>
  }
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>

<header class="masthead animate__animated animate__backInDown">
                    <div class="container h-100">
                        <div class="row h-50 align-items-center justify-content-center text-center">
                            <div class="align-middle">
                                <h1 class="  align-middle titleFont">Event Planner</h1>
                               </div>
                              
                        </div>
                    </div>
                </header>
                
                <div class="container" data-aos="fade-right">


  <div class="card-list"  >
    
  {
                    this.state.pachete.map((e,i) => <PacketCard  key={i}  item={e} onSelect={this.select} />)
                    
                    }
   
  </div>
</div>

</div>

)
  }
}


export default App;