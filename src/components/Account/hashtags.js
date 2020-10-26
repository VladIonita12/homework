

import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './insta-frame.css'


class HashTag extends Component{

    constructor(props){
        super(props)
        this.state={
            userPachet: null,

        }    
        
        this.delete = () =>{
          this.props.onDelete(this.props.item)
      }
    }
    componentDidMount(){
        

    }
    render(){
        
       
        return(
            <div >
            <Card>
    
    
    <Card.Body>
      <Card.Text>
        {this.props.item.hashtag+"  "}     
        <Button onClick={this.delete}>Delete</Button>
      </Card.Text>
    </Card.Body>
    
  </Card>

        </div>
        )
    }
}
export default HashTag