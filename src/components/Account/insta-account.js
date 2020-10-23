import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserPachetStore from '../../store/UserPachetStore'
import AccountStore from '../../store/AccountStore'
class InstaAccount extends Component{

    constructor(props){
        super(props)
        this.state={
            userPachet: null,

        }    
        this.store = new UserPachetStore();
        this.store1 = new AccountStore();
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


        </div>
        )
    }
}
export default InstaAccount