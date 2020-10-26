import React, { Component } from 'react';

import Button from 'react-bootstrap/Button'
import UserStore from '../../store/UserStore'
import Form from 'react-bootstrap/Form'
import './form-inscriere.css'
import AOS from 'aos'
import PaymentCard from 'react-payment-card-component'
import AccountList from '../Account/account-list';
import Alert from 'react-bootstrap/Alert'

class ScrollToTopOnMount extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }
  
    render() {
      return null;
    }
  }

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
            account: null,
            nrAccount: null,
            isOk: false
        };
        this.store = new UserStore();
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value,
                checkboxChecked: evt.target.checked
            })
        }

        this.submit = () => {
            var regUser = /.{3,}/
            var regParola = /.{8,}/
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
                        if(regUser.test(this.state.nume) && regUser.test(this.state.prenume)){
                            if(regParola.test(this.state.password)){
                        let dataAcum = new Date();
                        let an = dataAcum.getFullYear()
                        let luna = dataAcum.getMonth() + 1
                        let lunaInchere = dataAcum.getMonth() + 2
                        let zi = dataAcum.getDate()
                        this.setState({
                            nrAccount: this.state.usersData.length
                          })
                        let data = an + "-" + luna + "-" + zi
                        let incheiere = an + "-" + lunaInchere + "-" + zi
                        this.store.addUser({
                            numeClient: this.state.nume,
                            prenumeClient: this.state.prenume,
                            password: this.state.password,
                            emailClient: this.state.email,
                            tipClient: this.props.item.numePachet,
                            dataPlata: data,
                            dataIncheiere: incheiere
                        })

                        
                            this.store.getUsers()
                            this.setState({
                                account : this.store.users[this.store.users.length - 1]
                            })
                           
                            
                            this.setState({
                                isOk: !this.state.isOk
                            })
                        }
                        else alert("Parola trebuie sa aiba 8 caractere")
                        }
                        else alert("Numele si prenumele trebuie sa aiba minim 3 caractere")
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
                nrAccount: this.state.usersData.length
            })
        })

    }



    render() {
        AOS.init();
        
        if (this.state.isOk && this.store.users.length>this.state.nrAccount){
            
            
            
            return <AccountList account={this.state.usersData[this.state.usersData.length-1]}></AccountList>
        }
            return (
            <div className="form" data-aos="fade-right">
                <ScrollToTopOnMount />
                <Form >
                <Alert className="text-center" variant="dark"><h2>Formular de plată</h2></Alert>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Group controlId="formBasicNume">
                            <Form.Label>Nume</Form.Label>
                            <Form.Control value={this.state.nume} name="nume" pattern=".{3,}" title="3 sau mai multe caractere" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrenume">
                            <Form.Label>Prenume</Form.Label>
                            <Form.Control value={this.state.prenume} pattern=".{3,}" title="3 sau mai multe caractere" name="prenume" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} name="email" onChange={this.handleChange} type="email" />
                        <Form.Text className="text-muted">
                            Email-ul tau este in siguranta cu noi!
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Parola</Form.Label>
                        <Form.Control value={this.state.password} name="password" pattern=".{8,}" title="8 sau mai multe caractere" onChange={this.handleChange} type="password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirma parola</Form.Label>
                        <Form.Control value={this.state.passwordConfirm} pattern=".{8,}" title="8 sau mai multe caractere" name="passwordConfirm" onChange={this.handleChange} type="password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check required type="checkbox"
                            name="checkboxChecked"
                            label="Sunt de accord cu Termenii si Conditiile noastre, incluzand prelucrarea datelor (GDPR)"
                            onChange={this.handleChange}
                            checked={this.state.checkboxChecked} />
                    </Form.Group>
                    <PaymentCard
                        bank="ING"
                        model="Debit"
                        type="platinum"
                        brand="mastercard"
                        number="1111111111111111"
                        cvv="202"
                        holderName="Cumparator"
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