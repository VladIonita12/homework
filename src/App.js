import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'animate.css'
import AOS from 'aos'
import Carousel from 'react-bootstrap/Carousel'
import PacketCard from './components/Packet/packet-component'
import PachetStore from './store/PachetStore';
import FormInscriere from './components/FormInscriere/form-inscriere';
import ModalMade from './components/Modal/modal'
import UserStore from './store/UserStore';
import Alert from 'react-bootstrap/Alert'
import AccountList from './components/Account/account-list';
class ScrollToTopOnMount extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}
class App extends Component {

  constructor() {
    super();
    this.state = {
      pachete: [],
      selectedPachet: null,
      show: false,
      setShow: false,
      usersData: null,
      go: false,
      account: null
    };

    this.select = (pachet) => {
      this.setState({
        selectedPachet: pachet
      })
    }
    this.cancel = () => {
      this.setState({
        selectedPachet: null
      })

    }
    this.handleAccount = (accValue) => {

      this.setState({ account: accValue });

    }

    this.handleClose = () => { this.setState({ setShow: false }) }
    this.handleShow = () => { this.setState({ setShow: true }) }
    this.store = new PachetStore();
    this.store1 = new UserStore();
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    AOS.init();
    this.store.getPachete()
    this.store1.getUsers()

    this.store1.emitter.addListener('GET_USERS_SUCCESS', () => {

      this.setState({
        usersData: this.store1.users
      })

    })
    this.store.emitter.addListener('GET_PCK_SUCCESS', () => {

      this.setState({
        pachete: this.store.pachete
      })

    })

  }
  render() {

    AOS.init();
    if (this.state.account)
      return <AccountList account={this.state.account}></AccountList>
    if (this.state.selectedPachet)
      return <FormInscriere item={this.state.selectedPachet} onCancel={this.cancel}></FormInscriere>
    return (
      <div className="App container">
<ScrollToTopOnMount></ScrollToTopOnMount>
      



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
            <Navbar.Brand>Event Planner</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">

              </Nav>
              <Nav>
                {this.state.usersData && <ModalMade onSelectAccount={this.handleAccount} storage={this.state.usersData}></ModalMade>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <header className="masthead animate__animated animate__backInDown">
          <div className="container h-100">
            <div className="row h-50 align-items-center justify-content-center text-center">
              <div className="align-middle">
                <h1 className="  align-middle titleFont">Event Planner</h1>
              </div>

            </div>
          </div>
        </header>

        <div className="container" data-aos="fade-right">

        <Alert className="text-center" variant="dark"><h3>Pachetele noastre</h3></Alert>
          <div className="card-list"  >

            {
              this.state.pachete.map((e, i) => <PacketCard  key={i} item={e} onSelect={this.select} />)

            }

          </div>
        </div>
        <hr></hr>
        <Carousel className="mx-auto w-75">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Creati evenimente cu ajutorul nostru</h3>
      <p>Prin intermediul platformei Instagram</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Alaturi de tine 24/24</h3>
      <p>Suntem cu tine in orice problema ai intampina</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.pexels.com/photos/1481276/pexels-photo-1481276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Placerea este de partea noastra</h3>
      <p>Servicii calitative pentru toti clientii nostri, plata rapida si sigura</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        <hr></hr>
        <div className=" bg-grey">
        <Alert className="text-center" variant="dark"><h3>Contact</h3></Alert>
  <div className="row">
    <div className="col-sm-5">
      <p>Contacteaza-ne, si vom reveni la tine in 24 de ore</p>
      <p><span className="glyphicon glyphicon-map-marker"></span> Bucuresti, Romania</p>
      <p><span className="glyphicon glyphicon-phone"></span> +(04) 7xx xxx</p>
      <p><span className="glyphicon glyphicon-envelope"></span> myemail@something.com</p>
    </div>
    <div className="col-sm-7">
      <div className="row">
        <div className="col-sm-6 form-group">
          <input className="form-control" id="name" name="name" placeholder="Name" type="text" required/>
        </div>
        <div className="col-sm-6 form-group">
          <input className="form-control" id="email" name="email" placeholder="Email" type="email" required/>
        </div>
      </div>
      <textarea className="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea><br/>
      <div className="row">
        <div className="col-sm-12 form-group">
          <Button className="btn btn-default pull-right" >Send</Button>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>

    )
  }
}


export default App;