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
        

    }
    render(){
        
       
        return(
            <div className="container">
            <p>hello</p>
            <p>{this.props.userName}</p>
            <p> {this.props.val}</p>
            <p>{this.props.valInd}</p>


        </div>
        )
    }
}
export default InstaAccount