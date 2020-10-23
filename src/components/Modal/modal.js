import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

export default function ModalMade(props) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    
    
    const sendBackData = () => {
        var ok= false
       var id=null
        if(props.storage)
        for(var i=0;i<props.storage.length;i++){
          
          if(props.storage[i].emailClient ===email && props.storage[i].password ===password)
          {
          ok=true
            id=i
            
            
          }
         }
         if(ok===true){
         
       props.onSelectAccount(props.storage[id]);}
       else if(ok===false)
       alert("Cont gresit")
   }
    
      
    
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button> */}
        <Nav.Link  onClick={handleShow}>Login</Nav.Link>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
              <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
                        <Form.Control value={email} name="email" onChange={e => setEmail(e.target.value)} type="email" />
                        <Form.Text className="text-muted">
                            Email-ul tau este in siguranta cu noi!
    </Form.Text>
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Parola</Form.Label>
                        <Form.Control value={password} name="password" onChange={e => setPassword(e.target.value)} type="password" />
                    </Form.Group>
    </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" disabled={!validateForm()} onClick={sendBackData} >Login</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  