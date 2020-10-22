import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserStore from '../../store/UserStore'
import Form from 'react-bootstrap/Form'
import './form-inscriere.css'
import AOS from 'aos'

class FormInscriere extends Component{
    constructor(props) {
        super(props);
        this.state = {email: '',
        nume:'',
        prenume:'',
    password:'',
    passwordConfirm:'',
    checkboxChecked: false,
    users: []
};
    this.store = new UserStore();
    this.handleChange = (evt)=>{
        this.setState({
             [evt.target.name] : evt.target.value,
             checkboxChecked: evt.target.checked
      })
    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submit = () =>{
            
            alert(this.state.checkboxChecked)
            
        }
      }
    
      componentDidMount(){
        AOS.init();
        this.store.getUsers()
        this.store.emitter.addListener('GET_USERS_SUCCESS', ()=>{
            this.setState({
                usersData : this.store.users
            })
        })
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.email);
        event.preventDefault();
      }

    render(){
        AOS.init();
        console.log(this.props.item)
        return (
            <div className="form" data-aos="fade-right">
                
                <Form >
                    <h1>Formular de plata</h1>
  <Form.Group controlId="formBasicEmail">
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Nume</Form.Label>
    <Form.Control value={this.state.nume} name="nume" onChange={this.handleChange} />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Prenume</Form.Label>
    <Form.Control value={this.state.prenume} name="prenume" onChange={this.handleChange} />
  </Form.Group>
    <Form.Label>Email address</Form.Label>
    <Form.Control value={this.state.email} name="email" onChange={this.handleChange} type="email"  />
    <Form.Text className="text-muted">
      Email-ul tau este in siguranta cu noi!
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Parola</Form.Label>
    <Form.Control value={this.state.password} name="password" onChange={this.handleChange} type="password"  />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Confirma parola</Form.Label>
    <Form.Control value={this.state.passwordConfirm} name="passwordConfirm" onChange={this.handleChange} type="password"  />
  </Form.Group>
  
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check required type="checkbox" 
    name="checkboxChecked"
    label="Sunt de accord cu Termenii si Conditiile"
    onChange={this.handleChange}
    checked={this.state.checkboxChecked} />
  </Form.Group>
  <Button variant="primary" onClick={this.submit}>
    Submit
  </Button>
</Form>
<hr></hr>
<Button onClick={this.props.onCancel}>Cancel</Button>
            </div>
        )
    }

}

export default FormInscriere