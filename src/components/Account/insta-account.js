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
        
    }
    componentDidMount(){
        

    }
    render(){
        
       
        return(
            <div className="container">
            <p>hello</p>
           


        </div>
        )
    }
}
export default InstaAccount