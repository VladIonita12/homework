import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserPachetStore from '../../store/UserPachetStore'
import AccountStore from '../../store/AccountStore'
import Form from 'react-bootstrap/Form'
class AccountComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            userPachet: null,
            accArr:[],
            instaAcc:[]

        }    
        this.store = new UserPachetStore();
        this.store1 = new AccountStore();
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }
    }
    componentDidMount(){
        this.store.getUserPacket(this.props.account.id)
        this.store.emitter.addListener('GET_CONT_SUCCESS', ()=>{
      
            this.setState({
                userPachet: this.store.numarCont
            })
            
        })
        

    }
    render(){
        console.log(this.props.account.id)
        console.log(this.props.account)
        console.log(this.store.numarCont)
        console.log(this.state.userPachet)
        return(
            <div className="container">
            <p>hello</p>
            <h1>{this.props.account.numeClient}</h1>
            <h2>{this.state.userPachet}</h2>
        {Array.from(Array(this.state.userPachet)).map((x, index) =>     
   <div> <Form.Group  controlId="formBasicEmail">
   <Form.Label>{index}. Instagram Account</Form.Label>
    <Form.Control value={this.state.instaAcc[index]} key={index} name="instaAcc" placeholder="Enter Account" onChange={this.handleChange}  />
    </Form.Group>
    <Button onClick={this.state.accArr[index]=this.state.instaAcc[index]} >Save</Button>
   </div>
        )}

        </div>
        )
        }
}
export default AccountComponent