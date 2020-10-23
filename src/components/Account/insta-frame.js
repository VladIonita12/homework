

import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './insta-frame.css'
import UserPachetStore from '../../store/UserPachetStore'

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
            <div className="containerInsta">
            <Card>
    
    <Card.Header>{this.props.item.numeInsta} <img width="50px" height="50px" src="http://www.clker.com/cliparts/C/m/c/J/g/l/white-round-md.png"></img></Card.Header>
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