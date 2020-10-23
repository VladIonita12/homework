import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserStore from '../../store/UserStore'
import Form from 'react-bootstrap/Form'
import './form-inscriere.css'
import AOS from 'aos'
import PaymentCard from 'react-payment-card-component'
import AccountComponent from '../Account/account-component';
import AccountList from '../Account/account-list';
class FormInscriere extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            nume: '',
            prenume: '',
            password: '',
            passwordConfirm: '',
            checkboxChecked: false,
            usersData: [],
            account:null,
            nrAccount:null
        };
        this.store = new UserStore();
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value,
                checkboxChecked: evt.target.checked
            })
        }
        
        this.submit = () => {

            if (this.state.checkboxChecked) {
                if (this.state.password === this.state.passwordConfirm) {
                    var ok = false
                    for (var i = 0; i < this.state.usersData.length; i++) {
                       
                        if (this.state.usersData[i].emailClient === this.state.email) {
                            console.log(this.state.usersData[i].emailClient)
                            ok = true
                        }
                    }
                    if (ok === false) {
                        let dataAcum = new Date();
                        let an = dataAcum.getFullYear()
                        let luna = dataAcum.getMonth()+1
                        let lunaInchere = dataAcum.getMonth()+2
                        let zi = dataAcum.getDay()
                        console.log(an+"/"+luna+"/"+zi)
                        console.log(an+"/"+luna+1+"/"+zi)
                        let data=an+"-"+luna+"-"+zi
                        let incheiere = an+"-"+lunaInchere+"-"+zi
                        this.store.addUser({
                            numeClient: this.state.nume,
                            prenumeClient: this.state.prenume,
                            password: this.state.password,
                            emailClient:this.state.email,
                            tipClient: this.props.item.numePachet,
                            dataPlata: data,
                            dataIncheiere: incheiere
                        })

                        if(this.state.usersData.length>this.state.nrAccount){
                        this.state.account=this.state.usersData[this.state.usersData.length-1]
                            
                            console.log(this.state.account)

                        this.setState({
                            isOk: !this.state.isOk
                        })
                    }
                    }
                    else alert("Existing account")
                }
                else alert("Parolele nu se potrivesc")
            }
            else alert("Pentru a continua, accepta termenii")
        }
    }

    componentDidMount() {
        AOS.init();
        this.store.getUsers()
        this.store.emitter.addListener('GET_USERS_SUCCESS', () => {
            this.setState({
                usersData: this.store.users,
                nrAccount:this.state.usersData.length
            })
        })
        
    }



    render() {
        AOS.init();
        console.log(this.state.usersData)
        if(this.state.isOk)
        return <AccountList account={this.state.account}></AccountList>
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
                        <Form.Control value={this.state.email} name="email" onChange={this.handleChange} type="email" />
                        <Form.Text className="text-muted">
                            Email-ul tau este in siguranta cu noi!
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Parola</Form.Label>
                        <Form.Control value={this.state.password} name="password" onChange={this.handleChange} type="password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirma parola</Form.Label>
                        <Form.Control value={this.state.passwordConfirm} name="passwordConfirm" onChange={this.handleChange} type="password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check required type="checkbox"
                            name="checkboxChecked"
                            label="Sunt de accord cu Termenii si Conditiile"
                            onChange={this.handleChange}
                            checked={this.state.checkboxChecked} />
                    </Form.Group>
                    <PaymentCard
      bank="ING"
      model= "Debit"
      type="platinum"
      brand="mastercard"
      number="1111111111111111"
      cvv="202"
      holderName="Mare Cumparator"
      expiration="12/20"
      flipped={false}
    />
    <br></br>
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