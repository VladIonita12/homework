

import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './insta-frame.css'
import UserPachetStore from '../../store/UserPachetStore'

class HashTag extends Component{

    constructor(props){
        super(props)
        this.state={
            userPachet: null,

        }    
        
        this.delete = () =>{
          this.props.onDelete(this.props.item.id)
      }
    }
    componentDidMount(){
        

    }
    render(){
        
       
        return(
            <div className="containerInsta">
            <Card>
    
    
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
export default HashTag