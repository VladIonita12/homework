

import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './insta-frame.css'


class InstaFrame extends Component{

    constructor(props){
        super(props)
        this.state={
            userPachet: null,

        }    
        this.select = () =>{
          this.props.onSelect(this.props.item)
          
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
    
    <Card.Header>{this.props.item.numeInsta} <img width="50px" alt="img" height="50px" src="http://www.clker.com/cliparts/C/m/c/J/g/l/white-round-md.png"></img></Card.Header>
    <Card.Body>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Button onClick={this.select}>Select</Button> <Button onClick={this.delete}>Delete</Button>
    </Card.Footer>
  </Card>

        </div>
        )
    }
}
export default InstaFrame