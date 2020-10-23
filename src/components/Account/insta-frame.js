

import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserPachetStore from '../../store/UserPachetStore'
import AccountStore from '../../store/AccountStore'
class InstaFrame extends Component{

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
            <Card>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>

        </div>
        )
    }
}
export default InstaFrame